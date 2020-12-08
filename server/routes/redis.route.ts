import { Router } from 'express';
import { logUrl, logType, logHeaders, logBody } from '../middlewares/api-logging.middleware';
import RedisController from '../controllers/redis.controller';

const router = Router();
const controller: RedisController = new RedisController();

router.get('/', [ logUrl, logType, logHeaders, logBody ], controller.getKeys);
router.post('/', [ logUrl, logType, logHeaders, logBody ], controller.getMany);
router.get('/key/:key', [ logUrl, logType, logHeaders, logBody ], controller.get);
router.post('/key/:key', [ logUrl, logType, logHeaders, logBody ], controller.add);
router.put('/key/:key', [ logUrl, logType, logHeaders, logBody ], controller.update);
router.delete('/key/:key', [ logUrl, logType, logHeaders, logBody ], controller.delete);

export default router;
