import { Router } from 'express';
import { logUrl, logType, logHeaders, logBody } from '../middlewares/api-logging.middleware';
import MySqlController from '../controllers/mysql.controller';

const router = Router();
const controller: MySqlController = new MySqlController();

router.get('/', [ logUrl, logType, logHeaders, logBody ], controller.get);
router.get('/:id', [ logUrl, logType, logHeaders, logBody ], controller.getAll);
router.post('/', [ logUrl, logType, logHeaders, logBody ], controller.add);
router.put('/', [ logUrl, logType, logHeaders, logBody ], controller.update);
router.delete('/', [ logUrl, logType, logHeaders, logBody ], controller.delete);

export default router;
