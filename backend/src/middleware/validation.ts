import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const quoteSchema = Joi.object({
  text: Joi.string().required().min(10).max(1000).trim(),
  author: Joi.string().required().min(2).max(100).trim(),
  book: Joi.string().required().min(1).max(200).trim(),
  category: Joi.string().required().min(2).max(50).trim().lowercase(),
  likes: Joi.number().integer().min(0).default(0),
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(25),
  category: Joi.string().optional().trim().lowercase(),
  sortBy: Joi.string()
    .valid('createdAt', 'likes', 'author', 'category')
    .default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

export const validateQuote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = quoteSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
    return;
  }

  next();
};

export const validatePagination = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error, value } = paginationSchema.validate(req.query);

  if (error) {
    res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
    return;
  }

  // Replace query with validated values
  req.query = value;
  next();
};
