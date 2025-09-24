import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/contexts/QuoteContext';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useSwipe } from '@/hooks/useSwipe';
import QuoteCard from '@/components/QuoteCard';
import FloatingControls from '@/components/FloatingControls';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ChevronUp, ChevronDown } from 'lucide-react';

const QuotesPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    quotes,
    currentIndex,
    isLoading,
    error,
    nextQuote,
    prevQuote,
    toggleAutoPlay,
    setCurrentIndex
  } = useQuotes();

  // Keyboard navigation
  useKeyboard({
    onArrowUp: prevQuote,
    onArrowDown: nextQuote,
    onSpace: toggleAutoPlay,
    onEscape: () => navigate('/')
  });

  // Touch/swipe navigation
  const swipeRef = useSwipe({
    onSwipeUp: nextQuote,
    onSwipeDown: prevQuote,
  });

  // Scroll navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta += e.deltaY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (accumulatedDelta > 50) {
          nextQuote();
        } else if (accumulatedDelta < -50) {
          prevQuote();
        }
        accumulatedDelta = 0; 
      }, 40);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [nextQuote, prevQuote]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner size="lg" className="mx-auto mb-6" />
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading inspiring quotes...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div 
          className="text-center max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-8">
            <p className="text-red-600 dark:text-red-400 text-lg mb-6 font-medium">{error}</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div 
          className="text-center max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">No quotes found</p>
            <motion.button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="scroll-snap-container relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div ref={swipeRef} className="min-h-screen relative">
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Elegant Top Navigation Hint */}
        <motion.div 
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-2xl text-sm font-medium shadow-xl">
            <div className="flex items-center gap-2">
              <ChevronUp size={16} className="opacity-60" />
              <span>Swipe or use arrow keys</span>
              <ChevronDown size={16} className="opacity-60" />
            </div>
          </div>
        </motion.div>

        {/* Side Navigation Arrows */}
        <motion.button
          onClick={prevQuote}
          className="fixed top-1/2 left-6 transform -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChevronUp size={24} />
        </motion.button>

        <motion.button
          onClick={nextQuote}
          className="fixed top-1/2 right-6 transform -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChevronDown size={24} />
        </motion.button>

        {/* Quote Display */}
        <div className="scroll-snap-item">
          <AnimatePresence mode="wait">
            {quotes.map((quote, index) => (
              index === currentIndex && (
                <QuoteCard
                  key={`${quote.id}-${index}`}
                  quote={quote}
                  isActive={index === currentIndex}
                />
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Elegant Progress Dots */}
        <motion.div 
          className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl px-6 py-4 shadow-xl">
            {quotes.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((quote, index) => {
              const actualIndex = Math.max(0, currentIndex - 2) + index;
              return (
                <motion.button
                  key={quote.id}
                  onClick={() => setCurrentIndex(actualIndex)}
                  className={`rounded-full transition-all duration-300 ${
                    actualIndex === currentIndex
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-3 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-3 h-3 hover:scale-125'
                  }`}
                  whileHover={{ scale: actualIndex === currentIndex ? 1 : 1.25 }}
                  whileTap={{ scale: 0.9 }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Floating Controls - Repositioned and Redesigned */}
        <FloatingControls onHome={() => navigate('/')} />
      </div>
    </div>
  );
};

export default QuotesPage;