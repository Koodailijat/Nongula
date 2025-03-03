import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

export const updateTargetCalories = [
    body('target_calories_min', 'Target calories must be a positive integer')
        .isInt({ min: 1 })
        .withMessage('Target calories must be greater than 0'),
    body('target_calories_max', 'Target calories must be a positive integer')
        .isInt({ min: 1 })
        .withMessage('Target calories must be greater than 0'),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const userId = req.user.id;
            const { target_calories_min, target_calories_max } = req.body;

            const user = await prisma.user.update({
                where: { id: userId },
                data: { target_calories_min, target_calories_max },
                select: { target_calories_min: true },
            });

            res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    },
];

export const getCalorieStreak = [
    async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { target_calories_min: true },
            });

            if (!user) {
                next(createHttpError(404, 'User not found'));
                return;
            }

            const targetCaloriesMin = user.target_calories_min;
            let streakCount = 0;
            let hasMoreRecords = true;
            let lastCheckedDate = new Date();

            while (hasMoreRecords) {
                const foodLogs = await prisma.foodLog.findMany({
                    where: {
                        userId: userId,
                        date: { lte: lastCheckedDate },
                    },
                    orderBy: { date: 'desc' },
                    take: 100,
                });

                if (foodLogs.length === 0) break;

                let currentDate = null;
                let dailyCalories = 0;

                for (const log of foodLogs) {
                    if (
                        !currentDate ||
                        log.date.toISOString().split('T')[0] !== currentDate
                    ) {
                        if (currentDate && dailyCalories < targetCaloriesMin) {
                            res.status(200).json({ streakCount });
                            return;
                        }

                        streakCount++;
                        currentDate = log.date.toISOString().split('T')[0];
                        dailyCalories = 0;
                    }
                    dailyCalories += log.calories;
                }

                lastCheckedDate = foodLogs[foodLogs.length - 1].date;
                hasMoreRecords = foodLogs.length === 100;
            }

            res.status(200).json({ streakCount });
            return;
        } catch (error) {
            next(error);
        }
    },
];

export const getUser = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.user.id },
                select: {
                    id: true,
                    email: true,
                    target_calories_min: true,
                    target_calories_max: true,
                    age: true,
                    gender: true,
                },
            });

            if (!user) {
                next(createHttpError(404, 'User not found'));
                return;
            }

            res.status(200).json(user);
            return;
        } catch (error) {
            return next(error);
        }
    },
];

export const deleteUser = [
    body('email', 'Email must be defined')
        .trim()
        .isEmail()
        .isLength({ min: 1 })
        .escape(),
    body('password', 'Password must be defined').isLength({ min: 1 }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const user = await prisma.user.findUnique({
                where: { email: req.body.email },
            });

            if (!user) {
                next(createHttpError(401, 'Incorrect credentials'));
                return;
            }

            const isPasswordCorrect = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!isPasswordCorrect) {
                next(createHttpError(401, 'Incorrect credentials'));
                return;
            }

            await prisma.user.delete({
                where: { id: user.id },
            });

            res.status(200).json({ message: 'User deleted successfully' });
            return;
        } catch (error) {
            return next(error);
        }
    },
];

const calorieTable = {
    '2-3': {
        male: [
            [1000, 1000],
            [1000, 1000],
            [1000, 1000],
        ],
        female: [
            [1000, 1000],
            [1000, 1000],
            [1000, 1000],
        ],
    },
    '4-8': {
        male: [
            [1200, 1400],
            [1400, 1600],
            [1600, 2000],
        ],
        female: [
            [1200, 1400],
            [1400, 1600],
            [1400, 1800],
        ],
    },
    '9-13': {
        male: [
            [1600, 2000],
            [1800, 2200],
            [2000, 2600],
        ],
        female: [
            [1400, 1600],
            [1600, 2000],
            [1800, 2200],
        ],
    },
    '14-18': {
        male: [
            [2000, 2400],
            [2400, 2800],
            [2800, 3200],
        ],
        female: [
            [1800, 1800],
            [2000, 2000],
            [2400, 2400],
        ],
    },
    '19-30': {
        male: [
            [2400, 2600],
            [2600, 2800],
            [3000, 3000],
        ],
        female: [
            [1800, 2000],
            [2000, 2200],
            [2400, 2400],
        ],
    },
    '31-50': {
        male: [
            [2200, 2400],
            [2400, 2600],
            [2800, 3000],
        ],
        female: [
            [1800, 1800],
            [2000, 2000],
            [2200, 2200],
        ],
    },
    '51 and older': {
        male: [
            [2000, 2200],
            [2200, 2400],
            [2400, 2800],
        ],
        female: [
            [1600, 1600],
            [1800, 1800],
            [2000, 2200],
        ],
    },
};

const mapAgeToRange = (age: number): string | null => {
    if (age >= 2 && age <= 3) return '2-3';
    if (age >= 4 && age <= 8) return '4-8';
    if (age >= 9 && age <= 13) return '9-13';
    if (age >= 14 && age <= 18) return '14-18';
    if (age >= 19 && age <= 30) return '19-30';
    if (age >= 31 && age <= 50) return '31-50';
    if (age >= 51) return '51 and older';
    return null;
};

export const updateUserDetails = [
    body('age', 'Age must be a valid integer').isInt({ min: 2 }),
    body('gender', 'Gender must be either male or female').isIn([
        'male',
        'female',
    ]),
    body(
        'activity_level',
        'Activity level must be 1 (sedentary), 2 (moderate), or 3 (active)'
    ).isInt({ min: 1, max: 3 }),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const userId = req.user.id;
            const { age, gender, activity_level } = req.body;

            const ageRange = mapAgeToRange(age);
            if (
                !ageRange ||
                !calorieTable[ageRange] ||
                !calorieTable[ageRange][gender]
            ) {
                res.status(400).json({ error: 'Invalid age or gender input' });
                return;
            }

            const [target_calories_min, target_calories_max] =
                calorieTable[ageRange][gender][activity_level - 1];
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    age,
                    gender,
                    activity_level,
                    target_calories_min,
                    target_calories_max,
                },
                select: {
                    age: true,
                    gender: true,
                    activity_level: true,
                    target_calories_min: true,
                    target_calories_max: true,
                },
            });
            res.status(200).json(user);
            return;
        } catch (error) {
            return next(error);
        }
    },
];
