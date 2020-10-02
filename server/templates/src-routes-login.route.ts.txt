import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const router = Router();

router.get('/', LoginController.guestLogin);
router.post('/', LoginController.login);

export default router;