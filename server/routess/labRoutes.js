import express from 'express';
import {
  getLabResultsWithPatients,
  createLabResult
} from '../controllers/labController.js';

const router = express.Router();

router.get('/',  getLabResultsWithPatients);
router.post('/',  createLabResult);

export default router;