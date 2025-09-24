import { Request, Response, NextFunction } from 'express';
import { QuoteService } from '../services/QuoteService';

export class QuoteController {
  private quoteService = new QuoteService();

  getAllQuotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 25;
      const category = req.query.category as string;
      const sortBy = (req.query.sortBy as string) || 'createdAt';
      const sortOrder = (req.query.sortOrder as string) || 'desc';

      const result = await this.quoteService.getAllQuotes({
        page,
        limit,
        category,
        sortBy,
        sortOrder,
      });

      res.json({
        success: true,
        data: result.quotes,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalQuotes: result.totalQuotes,
          hasNext: result.hasNext,
          hasPrev: result.hasPrev,
        },
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  getQuoteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const quote = await this.quoteService.getQuoteById(req.params.id);

      if (!quote) {
        res.status(404).json({
          success: false,
          message: 'Quote not found',
        });
        return;
      }

      res.json({
        success: true,
        data: quote,
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  getRandomQuote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const category = req.query.category as string;
      const quote = await this.quoteService.getRandomQuote(category);

      if (!quote) {
        res.status(404).json({
          success: false,
          message: 'No quotes found',
        });
        return;
      }

      res.json({
        success: true,
        data: quote,
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  searchQuotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const query = req.query.q as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (!query) {
        res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
        return;
      }

      const result = await this.quoteService.searchQuotes(query, page, limit);

      res.json({
        success: true,
        data: result.quotes,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalQuotes: result.totalQuotes,
        },
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  createQuote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const quote = await this.quoteService.createQuote(req.body);

      res.status(201).json({
        success: true,
        data: quote,
        message: 'Quote created successfully',
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  updateQuote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const quote = await this.quoteService.updateQuote(req.params.id, req.body);

      if (!quote) {
        res.status(404).json({
          success: false,
          message: 'Quote not found',
        });
        return;
      }

      res.json({
        success: true,
        data: quote,
        message: 'Quote updated successfully',
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  toggleLike = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const quote = await this.quoteService.toggleLike(req.params.id);

      if (!quote) {
        res.status(404).json({
          success: false,
          message: 'Quote not found',
        });
        return;
      }

      res.json({
        success: true,
        data: quote,
        message: 'Quote liked successfully',
      });
      return;
    } catch (error) {
      next(error);
    }
  };

  deleteQuote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const deleted = await this.quoteService.deleteQuote(req.params.id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Quote not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Quote deleted successfully',
      });
      return;
    } catch (error) {
      next(error);
    }
  };
}
