import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbService';
import Loader from '../components/Loader';
import ErrorDisplay from '../components/ErrorDisplay';
import { ArrowLeft, Star, Clock, Calendar, Globe, Award, User, PenTool } from 'lucide-react';
import { motion } from 'motion/react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'Could not find movie details');
        }
      } catch (err) {
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="pt-24 min-h-screen"><Loader /></div>;
  if (error || !movie) return <div className="pt-24 min-h-screen"><ErrorDisplay message={error || 'Movie not found'} onRetry={() => navigate('/')} /></div>;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="relative h-[40vh] sm:h-[60vh] overflow-hidden -mt-24">
        <div className="absolute inset-0">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/seed/movie-bg/1200/800'}
            alt={movie.Title}
            className="w-full h-full object-cover scale-110 blur-2xl opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to results</span>
          </button>
          
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="shrink-0 w-48 sm:w-64 rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/seed/movie-p/400/600'}
                alt={movie.Title}
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="flex-1 pb-4">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {movie.Genre.split(',').map((g) => (
                  <span key={g} className="px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider">
                    {g.trim()}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-muted text-xs font-bold uppercase tracking-wider">
                  {movie.Rated}
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
                {movie.Title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-brand-muted font-medium">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-bold">{movie.imdbRating}</span>
                  <span className="text-xs opacity-60">/ 10</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{movie.Runtime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{movie.Released}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full" />
              Overview
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed">
              {movie.Plot}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full" />
              Top Cast
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {movie.Actors.split(',').map((actor) => (
                <div key={actor} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-surface border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{actor.trim()}</h4>
                    <p className="text-xs text-brand-muted">Actor</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-brand-surface border border-white/5 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                <Globe className="w-3.5 h-3.5" />
                Language
              </label>
              <p className="text-white font-medium">{movie.Language}</p>
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                <PenTool className="w-3.5 h-3.5" />
                Director
              </label>
              <p className="text-white font-medium">{movie.Director}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">
                <Award className="w-3.5 h-3.5" />
                Awards
              </label>
              <p className="text-white font-medium">{movie.Awards}</p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Metascore</p>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-bold ${parseInt(movie.Metascore) > 60 ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black'}`}>
                    {movie.Metascore}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Box Office</p>
                  <p className="text-white font-bold">{movie.BoxOffice || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
