import { Router } from 'express';
import passport from 'passport';
export const router = Router();
import { auth, login, signup } from '../controllers/auth.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/auth', passport.authenticate('jwt', { session: false }), auth);
