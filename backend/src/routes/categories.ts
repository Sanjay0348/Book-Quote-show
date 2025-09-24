import express from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = express.Router();
const categoryController = new CategoryController();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get quotes by category
router.get('/:category/quotes', categoryController.getQuotesByCategory);

export default router;