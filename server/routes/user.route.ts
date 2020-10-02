import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/', UserController.addUser);
router.put('/', UserController.updatePassword);

export default router;