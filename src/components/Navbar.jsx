import React from 'react';
import { Search, Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Clapperboard className="w-8 h-8 text-brand-primary transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold tracking-tighter text-white">
              CINE<span className="text-brand-primary">SEARCH</span>
            </span>
          </Link>
          
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-brand-muted hover:text-white transition-colors">
              Home
            </Link>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand-muted">
              <Search className="w-3.5 h-3.5" />
              <span>OMDb Powered</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
