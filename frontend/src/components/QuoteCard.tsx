import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, BookOpen, Trash2 } from 'lucide-react';
import { Quote } from '@/types';
import { useQuotes } from '@/contexts/QuoteContext';
import { quotesApi } from '@/services/api';

interface QuoteCardProps {
  quote: Quote;
  isActive: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isActive }) => {
  const { likeQuote, shareQuote, removeQuote } = useQuotes();
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLike = () => {
    console.log(quote);
    likeQuote(quote._id || quote.id);
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 1000);
  };

  const handleShare = () => {
    shareQuote(quote);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    const confirmDelete = window.confirm('Delete this quote? This cannot be undone.');
    if (!confirmDelete) return;
    try {
      setIsDeleting(true);
      const id = quote._id || quote.id;
      await quotesApi.deleteQuote(id);
      removeQuote(id);
    } catch (e) {
      alert('Failed to delete quote.');
    } finally {
      setIsDeleting(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: -50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={quote.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="quote-card max-w-4xl w-full relative"
        >
          {/* Category Badge */}
          <div className="absolute -top-3 left-8">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
              {quote.category}
            </span>
          </div>

          {/* Delete Button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`rounded-xl p-2 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'} border border-transparent hover:border-red-200/60 dark:hover:border-red-700/60 bg-white/70 dark:bg-gray-800/70`}
              title={isDeleting ? 'Deleting...' : 'Delete quote'}
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Quote Text */}
          <blockquote className="quote-text">
            "{quote.text}"
          </blockquote>

          {/* Author and Book */}
          <div className="space-y-2">
            <p className="quote-author">— {quote.author}</p>
            <p className="quote-book flex items-center justify-center gap-2">
              <BookOpen size={16} />
              {quote.book}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' 
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-red-900 dark:hover:text-red-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart 
                size={20} 
                fill={isLiked ? 'currentColor' : 'none'}
                className={isLiked ? 'heart-animation' : ''}
              />
              <span className="font-medium">{quote.likes}</span>
            </motion.button>

            <motion.button
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isShared 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900 dark:hover:text-blue-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} />
              <span className="font-medium">
                {isShared ? 'Shared!' : 'Share'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteCard;