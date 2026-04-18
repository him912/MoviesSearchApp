import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ query, setQuery, type, setType, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies, series, or episodes..."
          className="w-full h-14 pl-12 pr-32 bg-brand-surface border border-white/10 rounded-2xl text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all text-lg"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
        
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-6 bg-brand-primary hover:bg-red-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-brand-primary/20"
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-center gap-2 text-brand-muted shrink-0 mr-2">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Type:</span>
        </div>
        
        {[
          { label: 'All', value: '' },
          { label: 'Movies', value: 'movie' },
          { label: 'Series', value: 'series' },
          { label: 'Episodes', value: 'episode' }
        ].map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={`
              px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border
              ${type === t.value 
                ? 'bg-brand-primary border-brand-primary text-white' 
                : 'bg-brand-surface border-white/10 text-brand-muted hover:border-white/20 hover:text-white'}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>
    </form>
  );
};

export default SearchBar;
