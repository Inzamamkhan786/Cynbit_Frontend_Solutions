import React from 'react';
import { 
  IndianRupee, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  TrendingUp,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

const BUDGET_OPTIONS = [
  {
    tier: 'Below ₹25,000',
    title: 'Starter / Concept',
    description: 'Rapid prototype, landing page, single automation flow, or architectural feasibility proof.',
    badge: 'Lean MVP',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    tier: '₹25,000–₹50,000',
    title: 'Growth / Core MVP',
    description: 'Functional web or mobile MVP, essential API integrations, and database architecture.',
    badge: 'Popular',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    tier: '₹50,000–₹1,00,000',
    title: 'Production Platform',
    description: 'Full-featured SaaS platform, multi-role auth, payment gateways, and automated workflows.',
    badge: 'Standard',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  {
    tier: '₹1,00,000–₹5,00,000',
    title: 'Enterprise / AI Ecosystem',
    description: 'Autonomous AI agent swarms, high-throughput microservices, and multi-tenant cloud backends.',
    badge: 'Advanced',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    tier: 'Above ₹5,00,000',
    title: 'Custom Enterprise Scale',
    description: 'Mission-critical institutional software, custom LLM fine-tuning, and dedicated engineering squad.',
    badge: 'Enterprise',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    tier: 'Not decided yet',
    title: 'Exploratory / Flexible',
    description: 'Seeking architectural guidance and quote based on discovery scoping.',
    badge: 'Advisory',
    badgeColor: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  },
];

const TIMELINE_OPTIONS = [
  {
    id: 'ASAP',
    label: 'ASAP (Immediate)',
    desc: 'Rush sprint / high-priority kickoff',
    icon: Flame,
    color: 'text-amber-400',
  },
  {
    id: 'Within 1 month',
    label: 'Within 1 month',
    desc: 'Targeted rapid delivery',
    icon: Zap,
    color: 'text-blue-400',
  },
  {
    id: '1–3 months',
    label: '1–3 months',
    desc: 'Optimal for standard production sprints',
    icon: Calendar,
    color: 'text-indigo-400',
  },
  {
    id: '3–6 months',
    label: '3–6 months',
    desc: 'Comprehensive multi-phase deployment',
    icon: TrendingUp,
    color: 'text-cyan-400',
  },
  {
    id: 'Flexible',
    label: 'Flexible',
    desc: 'Quality-first, milestone-driven roadmap',
    icon: Clock,
    color: 'text-emerald-400',
  },
];

const StepBudgetTimeline = () => {
  const { formData, updateField, errors } = useDiscovery();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          Step 3 of 5: Investment & Velocity
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
          Budget parameters & target timeline
        </h2>
        <p className="text-sm text-slate-400">
          Transparent budgeting helps us allocate the right engineering specialists and architect appropriate technical scale.
        </p>
      </div>

      {/* Section 1: Budget */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Estimated Budget (INR)</h3>
              <p className="text-xs text-slate-400">Select your intended investment range</p>
            </div>
          </div>
          {errors.budget && (
            <span className="text-rose-400 text-xs font-medium">{errors.budget}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {BUDGET_OPTIONS.map((item) => {
            const isSelected = formData.budget === item.tier;

            return (
              <div
                key={item.tier}
                onClick={() => updateField('budget', item.tier)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/50 border-blue-500 ring-1 ring-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-blue-400 bg-blue-500 text-white'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <div className="text-lg font-bold text-white mb-1">{item.tier}</div>
                  <div className="text-xs font-semibold text-blue-400 mb-1.5">{item.title}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Timeline */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Target Timeline</h3>
              <p className="text-xs text-slate-400">When do you need the project delivered or active?</p>
            </div>
          </div>
          {errors.timeline && (
            <span className="text-rose-400 text-xs font-medium">{errors.timeline}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TIMELINE_OPTIONS.map((item) => {
            const isSelected = formData.timeline === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => updateField('timeline', item.id)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border flex flex-col items-start justify-between ${
                  isSelected
                    ? 'bg-indigo-950/50 border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`p-2 rounded-xl bg-slate-800/80 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-500 text-white'
                        : 'border-slate-700 bg-slate-800'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white mb-1">{item.label}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default StepBudgetTimeline;
