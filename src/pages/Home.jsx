import React, { useState, useEffect } from 'react';
import { searchMovies } from '../services/omdbService';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorDisplay from '../components/ErrorDisplay';
import { Clapperboard } from 'lucide-react';
import { motion } from 'motion/react';

const Home = () => {
  const [query, setQuery] = useState('Marvel');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = async (searchPage = 1) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, searchPage, type);
      if (data.Response === 'True') {
        setMovies(data.Search || []);
        setTotalPages(Math.ceil(parseInt(data.totalResults || '0') / 10));
        setPage(searchPage);
      } else {
        setMovies([]);
        setTotalPages(0);
        setError(data.Error || 'No results found');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [type]);

  const handleSearch = () => {
    fetchMovies(1);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 mb-6"
        >
          <Clapperboard className="w-8 h-8 text-brand-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4"
        >
          Find Your Next <span className="text-brand-primary italic">Story</span>
        </motion.h1>
        <p className="text-brand-muted text-lg max-w-2xl mx-auto">
          Explore thousands of movies, TV shows, and more. All the cinematic data you need, in one place.
        </p>
      </header>

      <SearchBar
        query={query}
        setQuery={setQuery}
        type={type}
        setType={setType}
        onSearch={handleSearch}
      />

      <div className="mt-12">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorDisplay message={error} onRetry={handleSearch} />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => fetchMovies(p)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
