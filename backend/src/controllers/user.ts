import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';

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
            });

            res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    },
];
