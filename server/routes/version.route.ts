import { Router } from 'express';
import { logUrl, logType, logHeaders, logBody } from '../middlewares/api-logging.middleware';
import VersionController from '../controllers/version.controller';

const router = Router();

router.get('/', [ logUrl, logType, logHeaders, logBody ], VersionController.get);

export default router;