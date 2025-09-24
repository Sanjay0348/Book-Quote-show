import { Request, Response, NextFunction } from 'express';
import { Quote } from '../models/Quote';
import { QuoteService } from '../services/QuoteService';

export class CategoryController {
  private quoteService = new QuoteService();

  getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await Quote.distinct('category');
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const count = await Quote.countDocuments({ category });
          return { name: category, count };
        })
      );

      res.json({
        success: true,
        data: categoriesWithCounts.sort((a, b) => b.count - a.count)
      });
    } catch (error) {
      next(error);
    }
  };

  getQuotesByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.quoteService.getAllQuotes({
        page,
        limit,
        category,
        sortBy: 'likes',
        sortOrder: 'desc'
      });

      res.json({
        success: true,
        data: result.quotes,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalQuotes: result.totalQuotes,
          hasNext: result.hasNext,
          hasPrev: result.hasPrev
        }
      });
    } catch (error) {
      next(error);
    }
  };
}