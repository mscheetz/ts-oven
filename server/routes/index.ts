import { Router } from 'express';
import base from './base.route';
import login from './login.route';
import mongo from './mongo.route';
import mysql from './mysql.route';
import oven from './oven.route';
import pg from './pg.route';
import redis from './redis.route';

const routes = Router();

routes.use('/', base);
routes.use('/login', login);
routes.use('/mongo', mongo);
routes.use('/mysql', mysql);
routes.use('/oven', oven);
routes.use('/pg', pg);
routes.use('/redis', redis);

export default routes;