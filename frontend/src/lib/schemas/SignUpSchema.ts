import { z } from 'zod';

export const SignUpSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            });
        }
    });
