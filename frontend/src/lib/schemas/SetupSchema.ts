import { z } from 'zod';

export const SetupSchema = z.object({
    age: z.number().positive(),
    activity_level: z.number().positive(),
    gender: z.string().min(1),
});
