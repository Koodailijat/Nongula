import { Router } from 'express';
import passport from 'passport';
export const router_food = Router();
import {
    addFood,
    deleteFood,
    getFoodById,
    getFoodLogsByDateRange,
    getWeekly,
    updateFoodLog,
} from '../controllers/food.js';

router_food.post(
    '/food',
    passport.authenticate('jwt', { session: false }),
    addFood
);

router_food.delete(
    '/food/:id',
    passport.authenticate('jwt', { session: false }),
    deleteFood
);

router_food.get(
    '/food/:id',
    passport.authenticate('jwt', { session: false }),
    getFoodById
);

router_food.get(
    '/foods',
    passport.authenticate('jwt', { session: false }),
    getFoodLogsByDateRange
);

router_food.get(
    '/foods/weekly',
    passport.authenticate('jwt', { session: false }),
    getWeekly
);

router_food.put(
    '/food',
    passport.authenticate('jwt', { session: false }),
    updateFoodLog
);
