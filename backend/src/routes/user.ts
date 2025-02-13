import { Router } from 'express';
import passport from 'passport';
export const router_user = Router();
import { updateTargetCalories } from '../controllers/user.js';

router_user.post(
    '/user',
    passport.authenticate('jwt', { session: false }),
    updateTargetCalories
);
