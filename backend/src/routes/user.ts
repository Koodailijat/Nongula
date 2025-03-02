import { Router } from 'express';
import passport from 'passport';
export const router_user = Router();
import {
    updateTargetCalories,
    deleteUser,
    getUser,
    updateUserDetails,
    getCalorieStreak,
} from '../controllers/user.js';
import { router } from './auth.js';

router_user.get(
    '/user/streak',
    passport.authenticate('jwt', { session: false }),
    getCalorieStreak
);

router_user.post(
    '/user',
    passport.authenticate('jwt', { session: false }),
    updateTargetCalories
);

router_user.post(
    '/setup',
    passport.authenticate('jwt', { session: false }),
    updateUserDetails
);

router_user.get(
    '/user',
    passport.authenticate('jwt', { session: false }),
    getUser
);

router.delete(
    '/user',
    passport.authenticate('jwt', { session: false }),
    deleteUser
);
