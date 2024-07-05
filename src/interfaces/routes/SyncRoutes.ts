import express from 'express';
import SyncController from '../controllers/SyncController';

const router = express.Router();

// POST /api/sync
router.post('/sync', SyncController.synchronizeData);

export default router;