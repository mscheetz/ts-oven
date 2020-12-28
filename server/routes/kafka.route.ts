import { Router } from 'express';
import KafkaController from '../controllers/kafka.controller';

const router = Router();
const controller: KafkaController = new KafkaController();

router.post('/test', controller.postTest);
router.post('/tester', controller.postTester);

export default router;