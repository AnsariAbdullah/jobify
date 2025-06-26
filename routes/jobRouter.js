import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  showStats
} from '../controllers/jobController.js';
import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// this is one way of doing it
// router.get('/', getAllJobs);
// router.post('/', createJob);

// this is another way which require less lines of code
router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router
  .route('/stats')
  .get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;