import { body, param, validationResult, query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma.js';
import createHttpError from 'http-errors';
import { startOfWeek, endOfWeek } from 'date-fns';

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
    body('date', 'Date must be a valid ISO 8601 date')
        .isISO8601()
        .withMessage('Invalid date format'),
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

            const { date, name } = req.body;

            const foodLog = await prisma.foodLog.findFirst({
                where: {
                    date: date,
                    name: name,
                    userId: userId,
                },
            });

            if (!foodLog) {
                res.status(404).json({ message: 'Food log not found' });
                return;
            }

            await prisma.foodLog.delete({
                where: {
                    id: foodLog.id,
                },
            });

            res.status(200).json({ message: 'Food log deleted successfully' });
            return;
        } catch (error) {
            return next(error);
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

export const getWeeklyFoodLogs = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const userId = req.user.id;
            const dateString = req.body.date as string;
            const date = new Date(dateString)
            console.log(date);

            if (req.user.id !== userId) {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }

            const weekStart = startOfWeek(date, { weekStartsOn: 1 });
            const weekEnd = endOfWeek(date, { weekStartsOn: 1 });

            const foodLogs = await prisma.foodLog.findMany({
                where: {
                    userId: userId,
                    date: {
                        gte: weekStart,
                        lte: weekEnd,
                    },
                },
                orderBy: { date: 'asc' },
            });
            res.status(200).json(foodLogs);
            return;
        } catch (error) {
            next(error);
        }
    },
];
