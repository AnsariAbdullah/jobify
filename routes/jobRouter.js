import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { validateJobInput } from "../middleware/validationMiddleware.js";

// this is one way of doing it
// router.get('/', getAllJobs);
// router.post('/', createJob);

// this is another way which require less lines of code
router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;