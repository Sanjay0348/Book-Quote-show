import express from 'express';
import { QuoteController } from '../controllers/QuoteController';
import { validateQuote, validatePagination } from '../middleware/validation';

const router = express.Router();
const quoteController = new QuoteController();

// Get all quotes with pagination and filtering
router.get('/', validatePagination, quoteController.getAllQuotes);

// Get random quote
router.get('/random', quoteController.getRandomQuote);

// Search quotes
router.get('/search', quoteController.searchQuotes);

// Get quote by ID
router.get('/:id', quoteController.getQuoteById);

// Create new quote (for admin/seeding)
router.post('/', validateQuote, quoteController.createQuote);

// Like/unlike quote
router.post('/:id/like', quoteController.toggleLike);

// Update quote (for admin)
router.put('/:id', validateQuote, quoteController.updateQuote);

// Delete quote (for admin)
router.delete('/:id', quoteController.deleteQuote);

export default router;