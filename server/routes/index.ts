import { Router } from 'express';
import address from './address.route';
import base from './base.route';
import login from './login.route';
// import mongo from './mongo.route';
// import mysql from './mysql.route';
import oven from './oven.route';
// import pg from './pg.route';
// import redis from './redis.route';
import version from './version.route';

const routes = Router();

routes.use('/', base);
routes.use('/v0/address', address);
routes.use('/v0/login', login);
// routes.use('/v0/mongo', mongo);
// routes.use('/v0/mysql', mysql);
routes.use('/v0/oven', oven);
// routes.use('/v0/pg', pg);
// routes.use('/v0/redis', redis);
routes.use('/v0/version', version);

export default routes;