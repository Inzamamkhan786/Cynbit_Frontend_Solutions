import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Globe, 
  Smartphone, 
  Code2, 
  Cloud, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Search, 
  Zap, 
  Layers, 
  HeartHandshake,
  TrendingUp,
  Compass
} from 'lucide-react';

const ECOSYSTEM_SERVICES = [
  {
    icon: Bot,
    title: 'AI Automation & Agents',
    category: 'LLM & Autonomous Swarms',
    description: 'Autonomous multi-agent workflows, self-healing background daemons, and fine-tuned domain intelligence.',
    accent: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/20',
  },
  {
    icon: Globe,
    title: 'Full-Stack Web Engineering',
    category: 'React, Next.js & Node.js',
    description: 'High-throughput microservices, responsive SaaS web architectures, and resilient database tiers.',
    accent: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/20',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Ecosystems',
    category: 'iOS & Android Native / Hybrid',
    description: 'Intuitive touch UX, offline telemetry sync, and production app store deployments.',
    accent: 'from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/20',
  },
  {
    icon: Cloud,
    title: 'Cloud Systems & DevOps',
    category: 'AWS, Azure & Kubernetes',
    description: 'Zero-downtime CI/CD deployment pipelines, automated security scanning, and serverless scaling.',
    accent: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/20',
  },
];

const SAAS_PRODUCTS = [
  {
    tag: 'CS',
    name: 'Cynbit Studio',
    subtitle: 'Career Intelligence Engine',
    desc: 'Automated skill telemetry and career trajectory forecasting for engineering teams.',
  },
  {
    tag: 'RA',
    name: 'Revio',
    subtitle: 'AI Review Assistant',
    desc: 'Autonomous code review and security vulnerability synthesis in pull request workflows.',
  },
  {
    tag: 'TE',
    name: 'TenantEase',
    subtitle: 'Property Ecosystem Platform',
    desc: 'Full-stack tenant lifecycle, automated lease auditing, and smart maintenance routing.',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="uppercase tracking-widest text-[11px] text-blue-400">The Optimistic Architect</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Jaipur, India</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white leading-[1.1]">
              Architecting the future with <br className="hidden sm:inline" />
              <span className="gradient-text">AI Automation</span> & scalable software.
            </h1>

            {/* Subhead */}
            <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed font-medium">
              Cynbit Technologies bridges the gap between deep technical precision and global enterprise growth. We engineer autonomous agents, high-performance web platforms, and resilient cloud architectures.
            </p>

            {/* Hero Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/discovery"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-500/25 flex items-center gap-3 transition-all hover:-translate-y-0.5 active:scale-95 group"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                Start Project Discovery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/track"
                className="px-7 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold text-sm transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-blue-400" />
                Track Enquiry Status
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>24-Hour Architect Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Strict IP Non-Disclosure</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Structured Architectural Scoping</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Interactive Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">cynbit.discovery.system</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/40">
                  v2.0 Active
                </span>
              </div>

              {/* Wizard Interactive Teaser */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Interactive Scope Qualification
                </span>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      01
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Select Capabilities</div>
                      <div className="text-[10px] text-slate-400">AI Agents, Web, Mobile, Cloud</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                      02
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Define Objectives</div>
                      <div className="text-[10px] text-slate-400">MVP, Automation, Scale, Features</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                      03
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Budget & Velocity</div>
                      <div className="text-[10px] text-slate-400">Structured Tiers (₹25k - ₹5L+)</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/discovery"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Launch Discovery Wizard Now
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Feature Showcase: Why Smart Discovery? */}
      <section className="py-20 px-4 md:px-8 border-y border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              The Cynbit Improvement
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
              Why Traditional Contact Forms Fail Potential Clients
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Traditional websites rely on generic text boxes or static email links that force users into endless back-and-forth communication. Cynbit’s Smart Project Discovery System transforms ambiguous ideas into structured, actionable engineering briefs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Old Way */}
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                The Traditional Approach (Outdated)
              </span>
              <h3 className="text-xl font-heading font-bold text-slate-300">
                Vague Forms & Manual Email Delays
              </h3>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Visitors are left guessing which technologies or engineering disciplines fit their requirements.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>No upfront guidance on budget brackets or realistic timelines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Zero submission transparency: no reference ID or way to track review status.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Sales & engineering teams receive chaotic, unstructured inquiries.</span>
                </li>
              </ul>
            </div>

            {/* The Cynbit Way */}
            <div className="p-8 rounded-3xl bg-blue-950/20 border border-blue-500/40 space-y-4 shadow-xl shadow-blue-500/5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                The Cynbit Smart Discovery System
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                Interactive Multi-Step Lead Qualification
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Guided Discovery:</strong> Select capabilities visually with predefined feature suggestions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Structured Budgets:</strong> Select transparent investment tiers and target timelines upfront.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant Reference Tracking:</strong> Receive a unique reference ID (e.g. CYN-2026-XXXX) with real-time pipeline status lookup.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Internal Architect CRM:</strong> Protected dashboard with metrics, search, filtering, and audit trail for Cynbit's recruitment & technical teams.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Ecosystem & Capabilities */}
      <section id="ecosystem" className="py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Our Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight">
            Foundational Engineering Pillars.
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl">
            Integrated excellence across AI autonomy, full-stack web and mobile systems, and scalable cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_SERVICES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/80">
                  <Link
                    to="/discovery"
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group/link"
                  >
                    Start with this service <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SaaS Product Suite */}
      <section id="products" className="py-20 px-4 md:px-8 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Proprietary toolkits
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
                Cynbit SaaS Suite.
              </h2>
            </div>
            <Link
              to="/discovery"
              className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
            >
              Build your custom SaaS with us <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAAS_PRODUCTS.map((prod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-sm">
                  {prod.tag}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">{prod.name}</h3>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {prod.subtitle}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BitElevate Internship Highlight */}
      <section id="bitelevate" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="relative p-8 md:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" /> Remote Software Engineering Lab
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight">
                BitElevate<span className="text-blue-500">.</span>
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                A 60-day remote engineering internship for students and graduates. Push git branches directly to real production repositories, receive daily line-by-line pull request reviews from senior architects, and earn ISO 9001:2015 verified credentials.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
                <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                  Full-Stack Web (Next.js & Node.js)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                  Python & AI Systems
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                  Direct PPO Track
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 text-center lg:text-right">
              <div className="inline-block p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-3">
                <div className="text-3xl font-black text-white">60 Days</div>
                <div className="text-xs uppercase tracking-widest text-slate-400">Remote Production Sprints</div>
                <div className="text-xs text-slate-500">Daily PR feedback from senior architects</div>
                <Link
                  to="/discovery"
                  className="w-full mt-2 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider block text-center transition-all"
                >
                  Apply via Discovery Wizard
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 md:px-8 border-t border-slate-800 text-center bg-slate-950">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight">
            Ready to construct your next digital breakthrough?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Take 2 minutes to define your service scope, requirements, and budget parameters in our guided wizard.
          </p>
          <div className="pt-2">
            <Link
              to="/discovery"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              Start Your Project Discovery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
