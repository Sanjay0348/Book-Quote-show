import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-30 animate-pulse delay-75" />

      <motion.div
        className="text-center max-w-4xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="absolute top-0 right-0 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </motion.button>

        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 p-4 rounded-full">
              <BookOpen size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            Book Quote
            <span className="text-blue-500"> Shorts</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed"
        >
          Discover inspiring quotes from your favorite books in a beautiful, 
          interactive format. Swipe, scroll, and explore wisdom from great literature.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <Sparkles className="text-blue-500 mb-4 mx-auto" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Curated Collection
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Hand-picked quotes from classic and contemporary literature
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <Heart className="text-red-500 mb-4 mx-auto" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Interactive Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Like, share, and explore quotes with smooth animations
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <BookOpen className="text-green-500 mb-4 mx-auto" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Reel-Style Navigation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Navigate through quotes like social media reels
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => navigate('/quotes')}
              className="group bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Reading
              <ArrowRight 
                size={24} 
                className="group-hover:translate-x-1 transition-transform duration-200" 
              />
            </motion.button>

            <motion.button
              onClick={() => navigate('/quotes/new')}
              className="group bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Quote
              <ArrowRight 
                size={24} 
                className="group-hover:translate-x-1 transition-transform duration-200" 
              />
            </motion.button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Use keyboard arrows or swipe to navigate • Press space for auto-play
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;