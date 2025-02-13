import { body, validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';

export const signup = [
    body('email', 'Email must be defined')
        .trim()
        .isEmail()
        .isLength({ min: 1 })
        .escape(),
    body('password', 'Password must be defined')
        .isLength({ min: 1 })
        .custom((value, { req }) => {
            if (value !== req.body.password_confirm) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
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

            if (user) {
                next(createHttpError(409, 'Email is already taken'));
                return;
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            await prisma.user.create({
                data: {
                    email: req.body.email,
                    password: hashedPassword,
                    target_calories: req.body.target_calories || 2000,
                },
            });
            res.status(201).json({});
            return;
        } catch (error) {
            return next(error);
        }
    },
];

export const login = [
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

            const token = jwt.sign(
                { sub: user.id, email: user.email },
                process.env.AUTH_SECRET,
                { expiresIn: '20h' }
            );

            res.status(200).json({
                token,
                id: user.id,
                email: user.email,
            });
            return;
        } catch (error) {
            return next(error);
        }
    },
];

export const auth = [
    async (req: Request, res: Response) => {
        res.status(200).json(req.user.id);
        return;
    },
];
