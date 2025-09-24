import express from 'express';
import { StatsController } from '../controllers/StatsController';

const router = express.Router();
const statsController = new StatsController();

// Get application statistics
router.get('/', statsController.getStats);

export default router;