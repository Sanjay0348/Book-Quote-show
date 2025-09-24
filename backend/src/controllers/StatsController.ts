import { Request, Response, NextFunction } from 'express';
import { Quote } from '../models/Quote';

export class StatsController {
  getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        totalQuotes,
        totalLikes,
        totalCategories,
        mostLikedQuote,
        categoryStats
      ] = await Promise.all([
        Quote.countDocuments(),
        Quote.aggregate([{ $group: { _id: null, total: { $sum: '$likes' } } }]),
        Quote.distinct('category').then(cats => cats.length),
        Quote.findOne().sort({ likes: -1 }).lean(),
        Quote.aggregate([
          {
            $group: {
              _id: '$category',
              count: { $sum: 1 },
              totalLikes: { $sum: '$likes' }
            }
          },
          { $sort: { count: -1 } }
        ])
      ]);

      res.json({
        success: true,
        data: {
          totalQuotes,
          totalLikes: totalLikes[0]?.total || 0,
          totalCategories,
          mostLikedQuote,
          categoryStats
        }
      });
    } catch (error) {
      next(error);
    }
  };
}