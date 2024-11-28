import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((err) => err.msg);
        throw new BadRequestError(errorMessage);
      }
      next()
    },
  ]
}

export const validateTest = withValidationError([
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters long')
    .trim()
]);