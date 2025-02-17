import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

export const updateTargetCalories = [
    body('target_calories', 'Target calories must be a positive integer')
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
            const { target_calories } = req.body;

            const user = await prisma.user.update({
                where: { id: userId },
                data: { target_calories },
                select: { target_calories: true },
            });

            res.status(200).json(user);
        } catch (error) {
            return next(error);
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
                    target_calories: true,
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
