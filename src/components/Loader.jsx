import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-4 border-brand-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border-t-4 border-brand-primary opacity-50 animate-spin-slow" />
      </div>
      <p className="text-brand-muted text-sm font-medium animate-pulse">Scanning the archives...</p>
    </div>
  );
};

export default Loader;
