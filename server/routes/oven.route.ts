import { Router } from 'express';
import { jwtCheck } from '../middlewares/auth.middleware';
import OvenController from '../controllers/oven.controller';

const router = Router();
const controller: OvenController = new OvenController();

router.get('/', [], controller.bakeTS);
router.post('/', [], controller.bakeTS);

export default router;