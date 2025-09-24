export interface Quote {
  id: string;
  _id?: string;
  text: string;
  author: string;
  book: string;
  category: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalQuotes: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface Stats {
  totalQuotes: number;
  totalLikes: number;
  totalCategories: number;
  mostLikedQuote: Quote;
  categoryStats: Array<{
    _id: string;
    count: number;
    totalLikes: number;
  }>;
}

export type Theme = 'light' | 'dark';

export interface QuoteContextType {
  quotes: Quote[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  isAutoPlay: boolean;
  setCurrentIndex: (index: number) => void;
  nextQuote: () => void;
  prevQuote: () => void;
  toggleAutoPlay: () => void;
  likeQuote: (id: string) => void;
  shareQuote: (quote: Quote) => void;
  fetchQuotes: () => void;
  removeQuote: (id: string) => void;
}