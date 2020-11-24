import { Router } from 'express';
import AddressController from '../controllers/address.controller';

const router = Router();

router.get('/btc', AddressController.btc);
router.get('/eth', AddressController.eth);
router.get('/xmr', AddressController.xmr);

export default router;