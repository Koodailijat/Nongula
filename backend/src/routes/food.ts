import { Router } from 'express';
import passport from 'passport';
export const router_food = Router();
import { addFood, deleteFood, getFoodById } from '../controllers/food.js';

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
