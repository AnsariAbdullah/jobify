import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((err) => err.msg);
        if (errorMessage[0].startsWith('no job')) {
          throw new NotFoundError(errorMessage);
        }
        throw new BadRequestError(errorMessage);
      }
      next()
    },
  ]
}

export const validateJobInput = withValidationError([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid type value'),

])

export const validateIdParam = withValidationError([
  param('id').custom(async (value) => {
    const isValidID = mongoose.Types.ObjectId.isValid(value);
    if (!isValidID) throw new BadRequestError('invalid MongoDB id')

    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with value ${value}`);
  })
])

export const validateRegisterInput = withValidationError([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('lastName is required')
])

export const validateLoginInput = withValidationError([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('password is required')
])