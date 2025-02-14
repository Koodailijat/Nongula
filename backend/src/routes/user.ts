import { Router } from 'express';
import passport from 'passport';
export const router_user = Router();
import {
    updateTargetCalories,
    deleteUser,
    getUser,
} from '../controllers/user.js';
import { router } from './auth.js';

router_user.post(
    '/user',
    passport.authenticate('jwt', { session: false }),
    updateTargetCalories
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
