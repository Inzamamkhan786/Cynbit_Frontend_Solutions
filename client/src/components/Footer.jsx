import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  Cpu
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                CYNBIT <span className="text-blue-500">TECHNOLOGIES</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Architecting the digital future with autonomous AI agents, enterprise software development, and scalable cloud ecosystems. Based in Jaipur, Rajasthan, serving visionaries globally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                The Optimistic Architect
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/#ecosystem" className="hover:text-blue-400 transition-colors">
                  AI Automation & Agents
                </a>
              </li>
              <li>
                <a href="/#ecosystem" className="hover:text-blue-400 transition-colors">
                  Full-Stack Web Engineering
                </a>
              </li>
              <li>
                <a href="/#ecosystem" className="hover:text-blue-400 transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="/#ecosystem" className="hover:text-blue-400 transition-colors">
                  Cloud & Microservices
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-blue-400 transition-colors">
                  Cynbit SaaS Suite
                </a>
              </li>
              <li>
                <a href="/#bitelevate" className="hover:text-blue-400 transition-colors">
                  BitElevate Internship
                </a>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Portals & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/discovery" className="hover:text-blue-400 transition-colors flex items-center gap-1 text-blue-400 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Project Discovery Wizard
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-blue-400 transition-colors">
                  Track Enquiry Status
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-500" />
                  Admin CRM Portal
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  GitHub Repository <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Engineering Lab
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>32/115 Pratap Nagar, Jaipur, RJ 302033, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:opportunities@cynbit.in" className="hover:text-white transition-colors">
                  opportunities@cynbit.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+918947962667" className="hover:text-white transition-colors">
                  +91 89479 62667
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Cynbit Technologies. Engineered for Optimism.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">ISO 9001:2015 Verified Processes</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-500">24-Hour Response Sync</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
