import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Quote, QuoteContextType } from '@/types';
import { quotesApi } from '@/services/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const useQuotes = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
};

interface QuoteProviderProps {
  children: React.ReactNode;
}

export const QuoteProvider: React.FC<QuoteProviderProps> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useLocalStorage('isAutoPlay', false);

  const fetchQuotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await quotesApi.getQuotes({ limit: 50 });
      setQuotes(response.data);
    } catch (err) {
      setError('Failed to fetch quotes. Please try again later.');
      console.error('Error fetching quotes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || quotes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % quotes.length);
    }, 4000); // 4 seconds per quote

    return () => clearInterval(interval);
  }, [isAutoPlay, quotes.length]);

  const nextQuote = () => {
    setCurrentIndex(prev => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentIndex(prev => (prev - 1 + quotes.length) % quotes.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(prev => !prev);
  };

  const likeQuote = async (id: string) => {
    try {
      const response = await quotesApi.likeQuote(id);
      if (response.success) {
        const updated = response.data;
        const responseId = (updated as any)._id || (updated as any).id || id;
        setQuotes(prev => 
          prev.map(quote => {
            const quoteId = (quote as any)._id || quote.id;
            if (quoteId === responseId || quote.id === id || (quote as any)._id === id) {
              return { ...quote, likes: updated.likes };
            }
            return quote;
          })
        );
      }
    } catch (err) {
      console.error('Error liking quote:', err);
    }
  };

  const shareQuote = (quote: Quote) => {
    const shareText = `"${quote.text}" — ${quote.author}, ${quote.book}`;

    if (navigator.share) {
      navigator.share({
        title: 'Book Quote',
        text: shareText,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        // You might want to show a toast notification here
        console.log('Quote copied to clipboard');
      });
    }
  };

  const removeQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => (q._id || q.id) !== id));
    setCurrentIndex(prev => {
      // Adjust index if needed after removal
      const newLength = Math.max(0, quotes.length - 1);
      if (newLength === 0) return 0;
      return Math.min(prev, newLength - 1);
    });
  };

  return (
    <QuoteContext.Provider
      value={{
        quotes,
        currentIndex,
        isLoading,
        error,
        isAutoPlay,
        setCurrentIndex,
        nextQuote,
        prevQuote,
        toggleAutoPlay,
        likeQuote,
        shareQuote,
        fetchQuotes,
        removeQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};