import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import { jwtStrategy } from './strategies/jwt.js';
import { router } from './routes/auth.js';
import { unknownEndpoint } from './middlewares/unkownendpoint.js';
import { errorHandler } from './middlewares/errorhandler.js';

const app = express();
passport.use(jwtStrategy);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);
app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(process.env.PORT);
