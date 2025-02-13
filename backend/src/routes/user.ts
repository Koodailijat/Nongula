import { Router } from 'express';
import passport from 'passport';
export const router_user = Router();
import { updateTargetCalories, deleteUser } from '../controllers/user.js';
import { router } from './auth';

router_user.post(
    '/user',
    passport.authenticate('jwt', { session: false }),
    updateTargetCalories
);

router.delete(
    '/user',
    passport.authenticate('jwt', { session: false }),
    deleteUser
);
