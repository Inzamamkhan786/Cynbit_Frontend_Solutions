import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#070a13] flex items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-black text-white">404</h1>
          <h2 className="text-xl font-heading font-bold text-slate-300">Architectural Node Not Found</h2>
          <p className="text-xs text-slate-400">
            The route or resource you are looking for has been relocated or does not exist in Cynbit’s digital architecture.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
