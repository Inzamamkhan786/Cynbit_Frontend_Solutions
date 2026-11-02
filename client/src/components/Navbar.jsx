import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  ArrowRight,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-nav px-4 md:px-8 py-3.5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Cynbit Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  CYNBIT
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  AI LAB
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
                Technologies
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            <Link
              to="/"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isCurrent('/')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>

            <a
              href="/#ecosystem"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              Ecosystem
            </a>

            <a
              href="/#products"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              SaaS Suite
            </a>

            <a
              href="/#bitelevate"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              BitElevate
            </a>

            <Link
              to="/track"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isCurrent('/track')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              Track Enquiry
            </Link>

            <Link
              to="/admin/dashboard"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isCurrent('/admin/dashboard') || isCurrent('/admin/login')
                  ? 'bg-slate-800 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-900/40 hover:bg-rose-950/30 transition-all"
              >
                Log Out
              </button>
            )}

            <Link
              to="/discovery"
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 rounded-full animate-pulse"></span>
              <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold uppercase tracking-wider group-hover:bg-transparent group-hover:text-white transition-all duration-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
                Start Discovery
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white py-2"
          >
            Home
          </Link>
          <a
            href="/#ecosystem"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white py-2"
          >
            Ecosystem & Services
          </a>
          <a
            href="/#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white py-2"
          >
            SaaS Suite
          </a>
          <a
            href="/#bitelevate"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white py-2"
          >
            BitElevate Program
          </a>
          <Link
            to="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white py-2"
          >
            Track Project Enquiry
          </Link>
          <Link
            to="/admin/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white py-2"
          >
            Admin Dashboard
          </Link>
          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/discovery"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              Start Project Discovery
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
