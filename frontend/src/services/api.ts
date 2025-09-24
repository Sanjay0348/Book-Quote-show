import axios from 'axios';
import { Quote, Category, Stats, ApiResponse, PaginatedResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';


const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const quotesApi = {
  // Get all quotes with pagination
  getQuotes: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<PaginatedResponse<Quote[]>> => {
    const response = await api.get('/quotes', { params });
    return response.data;
  },

  // Get single quote by ID
  getQuote: async (id: string): Promise<ApiResponse<Quote>> => {
    const response = await api.get(`/quotes/${id}`);
    return response.data;
  },

  // Get random quote
  getRandomQuote: async (category?: string): Promise<ApiResponse<Quote>> => {
    const response = await api.get('/quotes/random', {
      params: category ? { category } : {},
    });
    return response.data;
  },

  // Search quotes
  searchQuotes: async (
    query: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Quote[]>> => {
    const response = await api.get('/quotes/search', {
      params: { q: query, page, limit },
    });
    return response.data;
  },

  // Like/unlike quote
  likeQuote: async (id: string): Promise<ApiResponse<Quote>> => {
    const response = await api.post(`/quotes/${id}/like`);
    return response.data;
  },

  // Create quote (admin)
  createQuote: async (quote: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Quote>> => {
    const response = await api.post('/quotes', quote);
    return response.data;
  },

  // Update quote (admin)
  updateQuote: async (id: string, quote: Partial<Quote>): Promise<ApiResponse<Quote>> => {
    const response = await api.put(`/quotes/${id}`, quote);
    return response.data;
  },

  // Delete quote (admin)
  deleteQuote: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/quotes/${id}`);
    return response.data;
  },
};

export const categoriesApi = {
  // Get all categories
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get quotes by category
  getQuotesByCategory: async (
    category: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Quote[]>> => {
    const response = await api.get(`/categories/${category}/quotes`, {
      params: { page, limit },
    });
    return response.data;
  },
};

export const statsApi = {
  // Get application statistics
  getStats: async (): Promise<ApiResponse<Stats>> => {
    const response = await api.get('/stats');
    return response.data;
  },
};

export default api;