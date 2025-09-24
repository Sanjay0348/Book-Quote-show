import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Sun,
  Moon,
  Home,
  RotateCcw,
  Settings
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useQuotes } from '@/contexts/QuoteContext';

interface FloatingControlsProps {
  onHome: () => void;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({ onHome }) => {
  const { theme, toggleTheme } = useTheme();
  const {
    nextQuote,
    prevQuote,
    isAutoPlay,
    toggleAutoPlay,
    currentIndex,
    quotes,
    fetchQuotes
  } = useQuotes();

  const controlVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.2 } 
    },
    tap: { 
      scale: 0.95,
      rotate: 0,
      transition: { duration: 0.1 } 
    }
  };

  const primaryButtonVariants = {
    hover: { 
      scale: 1.15,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.2 } 
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 } 
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
      initial="hidden"
      animate="visible"
      variants={controlVariants}
    >
      {/* Main Control Panel */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/60 dark:border-gray-700/60 shadow-2xl rounded-3xl px-2 py-2 mb-4">
        <div className="flex items-center gap-1">
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/80 rounded-2xl p-1">
            <motion.button 
              onClick={prevQuote} 
              className="control-btn-modern text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              title="Previous Quote"
            >
              <ChevronUp size={20} />
            </motion.button>
            
            <motion.button 
              onClick={nextQuote} 
              className="control-btn-modern text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              title="Next Quote"
            >
              <ChevronDown size={20} />
            </motion.button>
          </div>

          {/* Play/Pause - Primary Action */}
          <motion.button 
            onClick={toggleAutoPlay} 
            className={`control-btn-primary ${
              isAutoPlay 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
            }`}
            variants={primaryButtonVariants}
            whileHover="hover"
            whileTap="tap"
            title={isAutoPlay ? 'Pause Slideshow' : 'Start Slideshow'}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isAutoPlay ? 0 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isAutoPlay ? <Pause size={22} /> : <Play size={22} />}
            </motion.div>
          </motion.button>

          {/* Quote Counter */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200/50 dark:border-gray-600 rounded-2xl px-4 py-2 mx-1">
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currentIndex + 1} / {quotes.length}
            </span>
          </div>

          {/* Utility Controls */}
          <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/80 rounded-2xl p-1">
            <motion.button 
              onClick={toggleTheme} 
              className="control-btn-modern text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              title="Toggle Theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </motion.button>
            
            <motion.button 
              onClick={fetchQuotes} 
              className="control-btn-modern text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              title="Refresh Quotes"
            >
              <RotateCcw size={18} />
            </motion.button>
            
            <motion.button 
              onClick={onHome} 
              className="control-btn-modern text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              title="Go Home"
            >
              <Home size={18} />
            </motion.button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default FloatingControls;