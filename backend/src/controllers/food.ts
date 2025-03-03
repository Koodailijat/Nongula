import { body, param, validationResult, query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { prisma } from '../utils/prisma.js';

export const addFood = [
    body('date', 'Date must be a valid ISO 8601 date')
        .isISO8601()
        .withMessage('Invalid date format'),
    body('calories', 'Calories must be a number greater than 0')
        .isInt({ gt: 0 })
        .withMessage('Calories must be a positive integer'),
    body('name', 'Name must be provided and cannot be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const userId = req.user.id;

            const { date, calories, name } = req.body;

            const foodLog = await prisma.foodLog.create({
                data: {
                    date: new Date(date),
                    calories: Number(calories),
                    name,
                    user: {
                        connect: { id: userId },
                    },
                },
            });

            res.status(201).json(foodLog);
        } catch (error) {
            return next(error);
        }
    },
];

export const deleteFood = [
    param('id', 'Invalid id').isString().isLength({ min: 1 }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            await prisma.foodLog.delete({
                where: {
                    id: req.params.id,
                    userId: req.user.id,
                },
            });

            res.status(200).json({ message: 'Food log deleted successfully' });
            return;
        } catch (error) {
            return next(error);
        }
    },
];

export const getWeekly = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Received query:', req.query);
            const userId = req.user.id; // Authenticated user ID
            const { date } = req.query; // Get date from query params

            if (!date) {
                res.status(400).json({ message: 'Date is required' });
                return;
            }

            let parsedDate: Date;

            if (typeof date === 'string') {
                parsedDate = parseISO(date);
            }
            const monday = startOfWeek(parsedDate, { weekStartsOn: 1 }); // Monday
            const sunday = endOfWeek(parsedDate, { weekStartsOn: 1 }); // Sunday

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { target_calories_min: true },
            });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const weeklyTarget = user.target_calories_min * 7;

            const foodLogs = await prisma.foodLog.findMany({
                where: {
                    userId: userId,
                    date: {
                        gte: monday,
                        lte: sunday,
                    },
                },
                select: { calories: true },
            });

            const weeklyCalories = foodLogs.reduce(
                (sum, log) => sum + log.calories,
                0
            );

            res.status(200).json({ weeklyCalories, weeklyTarget });
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
];

export const getFoodById = [
    param('id', 'ID must be a valid UUID')
        .isUUID()
        .withMessage('Invalid ID format'),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const userId = req.user.id;

            const { id } = req.params;

            const foodLog = await prisma.foodLog.findFirst({
                where: {
                    id: id,
                    userId: userId,
                },
            });

            if (!foodLog) {
                res.status(404).json({ message: 'Food log not found' });
                return;
            }

            const { userId: _, ...foodLogData } = foodLog;

            res.status(200).json(foodLogData);
            return;
        } catch (error) {
            return next(error);
        }
    },
];

export const updateFoodLog = [
    body('id', 'ID must be a valid UUID')
        .isUUID()
        .withMessage('Invalid ID format'),
    body('calories', 'Calories must be a positive integer')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Invalid calorie value'),
    body('name', 'Name must be a non-empty string')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('Invalid name'),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const userId = req.user.id;
            const { id, calories, name } = req.body;

            const foodLog = await prisma.foodLog.findFirst({
                where: {
                    id: id,
                    userId: userId,
                },
            });

            if (!foodLog) {
                res.status(404).json({ message: 'Food log not found' });
                return;
            }

            const updatedFoodLog = await prisma.foodLog.update({
                where: { id: id },
                data: {
                    calories:
                        calories !== undefined ? calories : foodLog.calories,
                    name: name !== undefined ? name : foodLog.name,
                },
            });

            res.status(200).json(updatedFoodLog);
            return;
        } catch (error) {
            return next(error);
        }
    },
];

export const getFoodLogsByDateRange = [
    query('startDate', 'Start date must be in YYYY-MM-DD format')
        .optional()
        .isISO8601()
        .withMessage('Invalid start date format'),
    query('endDate', 'End date must be in YYYY-MM-DD format')
        .optional()
        .isISO8601()
        .withMessage('Invalid end date format'),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const userId = req.user.id;
            const startDate = req.query.startDate
                ? new Date(req.query.startDate as string)
                : undefined;
            const endDate = req.query.endDate
                ? new Date(req.query.endDate as string)
                : undefined;

            const foodLogs = await prisma.foodLog.findMany({
                where: {
                    userId: userId,
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });

            if (!foodLogs.length) {
                res.status(204).json([]);
                return;
            }

            res.status(200).json(foodLogs);
            return;
        } catch (error) {
            return next(error);
        }
    },
];
