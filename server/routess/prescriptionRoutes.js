import express from 'express';
import {
  getPrescriptionsWithDetails,
  createPrescription
} from '../controllers/prescriptionController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, getPrescriptionsWithDetails);
router.post('/', protect, createPrescription);

export default router;