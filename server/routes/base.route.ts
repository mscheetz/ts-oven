import { Router } from 'express';
import { logUrl, logType, logHeaders, logBody } from '../middlewares/logging.middleware';
import BaseController from '../controllers/base.controller';

const router = Router();

router.all('/', [ logUrl, logType, logHeaders, logBody ], BaseController.response);

export default router;