// src/routes/index.js
import { Router } from 'express';
import { notifyUsers } from '../controllers/notificationController.js';

const router = Router();

router.post('/notify', notifyUsers);

export default router;