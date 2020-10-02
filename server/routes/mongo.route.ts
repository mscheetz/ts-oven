import { Router } from 'express';
import { logUrl, logType, logHeaders, logBody } from '../middlewares/logging.middleware';
import MongoController from '../controllers/mongo.controller';

const router = Router();
const controller: MongoController = new MongoController();

router.get('/', [ logUrl, logType, logHeaders, logBody ], controller.getAll);
router.get('/:id', [ logUrl, logType, logHeaders, logBody ], controller.get);
router.post('/', [ logUrl, logType, logHeaders, logBody ], controller.add);
router.put('/', [ logUrl, logType, logHeaders, logBody ], controller.update);
router.delete('/:id', [ logUrl, logType, logHeaders, logBody ], controller.delete);

export default router;
