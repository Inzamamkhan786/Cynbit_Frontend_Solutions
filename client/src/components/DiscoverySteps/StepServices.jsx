import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Code2, 
  Cloud, 
  Palette, 
  PlusCircle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

const SERVICES_DATA = [
  {
    id: 'AI Automation & AI Agents',
    title: 'AI Automation & AI Agents',
    badge: 'Popular',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    description: 'Autonomous multi-agent workflows, LLM orchestration, intelligent bots, and operational automation.',
    icon: Bot,
    highlights: ['Autonomous Agents', 'RAG & Vector DBs', 'Workflow Automation'],
  },
  {
    id: 'Web Development',
    title: 'Web Development',
    badge: 'Full-Stack',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Modern, high-performance web applications, responsive SaaS portals, Next.js, and API backends.',
    icon: Globe,
    highlights: ['React / Next.js', 'Enterprise SaaS', 'High Scalability'],
  },
  {
    id: 'Mobile App Development',
    title: 'Mobile App Development',
    badge: 'iOS & Android',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    description: 'Native and cross-platform mobile apps engineered for fluid performance and intuitive touch UX.',
    icon: Smartphone,
    highlights: ['Cross-Platform', 'Offline Sync', 'App Store Ready'],
  },
  {
    id: 'Custom Software Development',
    title: 'Custom Software Development',
    badge: 'Enterprise',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description: 'Tailored enterprise architectures, internal management tools, and specialized business logic engines.',
    icon: Code2,
    highlights: ['Bespoke Systems', 'Microservices', 'Database Design'],
  },
  {
    id: 'Cloud Infrastructure',
    title: 'Cloud Infrastructure',
    badge: 'DevOps',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: 'Resilient cloud deployments on AWS and Azure, CI/CD pipelines, containerization, and monitoring.',
    icon: Cloud,
    highlights: ['AWS & Azure', 'Docker & K8s', 'Zero-Downtime CI/CD'],
  },
  {
    id: 'UI/UX Design',
    title: 'UI/UX Design',
    badge: 'Design Systems',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    description: 'Human-centric user journeys, high-fidelity Figma prototypes, design systems, and usability research.',
    icon: Palette,
    highlights: ['Figma Tokens', 'Micro-interactions', 'User Journey Maps'],
  },
  {
    id: 'Other',
    title: 'Other / Bespoke R&D',
    badge: 'Consulting',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'Hardware-software bridges, technical feasibility audits, security hardening, or niche consulting.',
    icon: PlusCircle,
    highlights: ['Technical Audit', 'Architecture Advisory', 'Custom Solution'],
  },
];

const StepServices = () => {
  const { formData, toggleService, errors } = useDiscovery();
  const selectedCount = formData.services.length;

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          Step 1 of 5: Service Architecture
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
          Which services does your vision require?
        </h2>
        <p className="text-sm text-slate-400">
          Select all applicable capabilities. You can combine multiple disciplines for a comprehensive full-stack solution.
        </p>
      </div>

      {errors.services && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2 max-w-lg mx-auto animate-shake">
          <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
          {errors.services}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {SERVICES_DATA.map((service) => {
          const isSelected = formData.services.includes(service.id);
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`cursor-pointer rounded-2xl p-5 transition-all duration-200 relative group flex flex-col justify-between border ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50 -translate-y-1'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 hover:-translate-y-0.5'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'bg-slate-800/80 text-slate-300 group-hover:bg-slate-800 group-hover:text-blue-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-blue-400 bg-blue-500 text-white'
                          : 'border-slate-700 bg-slate-800/40 group-hover:border-slate-600'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                {service.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs text-slate-400 pt-2">
        <span className="font-semibold text-blue-400">{selectedCount}</span> {selectedCount === 1 ? 'service' : 'services'} selected
      </div>
    </div>
  );
};

export default StepServices;
