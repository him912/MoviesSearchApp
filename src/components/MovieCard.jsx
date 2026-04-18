import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Calendar } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative bg-brand-surface rounded-xl overflow-hidden shadow-lg border border-white/5 transition-all duration-300 hover:border-brand-primary/50"
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/seed/movie/400/600'}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 bg-brand-surface">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-widest text-brand-primary font-bold">
              {movie.Type}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-brand-muted">
              <Calendar className="w-3 h-3" />
              <span>{movie.Year}</span>
            </div>
          </div>
          <h3 className="font-semibold text-white line-clamp-1 group-hover:text-brand-primary transition-colors">
            {movie.Title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
