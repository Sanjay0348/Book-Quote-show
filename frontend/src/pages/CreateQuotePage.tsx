import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quotesApi } from '@/services/api';

const CreateQuotePage: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [book, setBook] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!text.trim() || !author.trim() || !book.trim() || !category.trim()) {
      setError('All fields are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await quotesApi.createQuote({ text, author, book, category, likes: 0 });
      navigate('/quotes');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to create quote';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Create Quote</h1>

        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type the quote text"
              maxLength={1000}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. George Orwell"
                maxLength={100}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Book</label>
              <input
                type="text"
                value={book}
                onChange={(e) => setBook(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 1984"
                maxLength={200}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. dystopian"
              maxLength={50}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Creating...' : 'Create Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuotePage;
