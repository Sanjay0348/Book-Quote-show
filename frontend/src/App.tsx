import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { QuoteProvider } from './contexts/QuoteContext';
import HomePage from './pages/HomePage';
import QuotesPage from './pages/QuotesPage';
import ErrorBoundary from './components/ErrorBoundary';
import CreateQuotePage from './pages/CreateQuotePage';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QuoteProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/quotes/:category" element={<QuotesPage />} />
              <Route path="/quotes/new" element={<CreateQuotePage />} />
            </Routes>
          </div>
        </QuoteProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;