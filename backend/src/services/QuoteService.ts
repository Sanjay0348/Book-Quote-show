import { Quote, IQuote } from '../models/Quote';

interface GetAllQuotesOptions {
  page: number;
  limit: number;
  category?: string;
  sortBy: string;
  sortOrder: string;
}

interface PaginatedResult {
  quotes: IQuote[];
  currentPage: number;
  totalPages: number;
  totalQuotes: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class QuoteService {
  async getAllQuotes(options: GetAllQuotesOptions): Promise<PaginatedResult> {
    const { page, limit, category, sortBy, sortOrder } = options;
    const skip = (page - 1) * limit;

    let query = Quote.find();

    if (category) {
      query = query.where({ category });
    }

    // Sort options
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [quotes, totalQuotes] = await Promise.all([
      query
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Quote.countDocuments(category ? { category } : {})
    ]);

    const totalPages = Math.ceil(totalQuotes / limit);

    return {
      quotes: quotes as IQuote[],
      currentPage: page,
      totalPages,
      totalQuotes,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  async getQuoteById(id: string): Promise<IQuote | null> {
    return Quote.findById(id).lean();
  }

  async getRandomQuote(category?: string): Promise<IQuote | null> {
    const pipeline = [];

    if (category) {
      pipeline.push({ $match: { category } });
    }

    pipeline.push({ $sample: { size: 1 } });

    const result = await Quote.aggregate(pipeline);
    return result.length > 0 ? result[0] : null;
  }

  async searchQuotes(query: string, page: number, limit: number): Promise<PaginatedResult> {
    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        { text: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { book: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    };

    const [quotes, totalQuotes] = await Promise.all([
      Quote.find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ likes: -1 })
        .lean(),
      Quote.countDocuments(searchQuery)
    ]);

    const totalPages = Math.ceil(totalQuotes / limit);

    return {
      quotes: quotes as IQuote[],
      currentPage: page,
      totalPages,
      totalQuotes,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  async createQuote(quoteData: Partial<IQuote>): Promise<IQuote> {
    const quote = new Quote(quoteData);
    return quote.save();
  }

  async updateQuote(id: string, updateData: Partial<IQuote>): Promise<IQuote | null> {
    return Quote.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();
  }

  async toggleLike(id: string): Promise<IQuote | null> {
    return Quote.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    ).lean();
  }

  async deleteQuote(id: string): Promise<boolean> {
    const result = await Quote.findByIdAndDelete(id);
    return !!result;
  }

  async getQuotesByCategory(category: string): Promise<IQuote[]> {
    return Quote.find({ category }).sort({ likes: -1 }).lean();
  }

  async getMostLikedQuotes(limit: number = 10): Promise<IQuote[]> {
    return Quote.find().sort({ likes: -1 }).limit(limit).lean();
  }
}