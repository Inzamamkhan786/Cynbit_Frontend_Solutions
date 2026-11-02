import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  Users, 
  ListPlus, 
  X, 
  Plus, 
  Sparkles,
  Info
} from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

const OBJECTIVE_PRESETS = [
  'Build New MVP from Scratch',
  'Automate Manual Operations',
  'Scale Existing System',
  'Modernize Legacy Tech Stack',
  'Internal Enterprise Portal',
];

const AUDIENCE_PRESETS = [
  'B2B Enterprise Clients',
  'Direct Consumers (B2C)',
  'Internal Operations & Staff',
  'Developers & Tech Partners',
];

const POPULAR_FEATURE_SUGGESTIONS = [
  'Autonomous AI Agents',
  'User Auth & Role Management',
  'Payment Gateway (Razorpay/Stripe)',
  'Real-time Dashboard & Analytics',
  'REST & GraphQL APIs',
  'Automated Email & SMS Alerts',
  'File & Media Uploads',
  'Audit Logging & Compliance',
];

const StepProjectInfo = () => {
  const { formData, updateField, addFeature, removeFeature, errors } = useDiscovery();
  const [customFeature, setCustomFeature] = useState('');

  const handleFeatureKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (customFeature.trim()) {
        addFeature(customFeature.trim());
        setCustomFeature('');
      }
    }
  };

  const handleAddFeatureClick = () => {
    if (customFeature.trim()) {
      addFeature(customFeature.trim());
      setCustomFeature('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          Step 2 of 5: Project Scope & Objectives
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
          Tell us about what you’re building
        </h2>
        <p className="text-sm text-slate-400">
          Clear scoping helps our senior engineering team evaluate architectural requirements accurately.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-slate-800">
        
        {/* Project Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              Project or Venture Name *
            </span>
            {errors.projectName && (
              <span className="text-rose-400 normal-case font-normal text-xs">{errors.projectName}</span>
            )}
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => updateField('projectName', e.target.value)}
            placeholder="e.g. Omnichannel Logistics Orchestrator, Revio AI Platform"
            className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
              errors.projectName
                ? 'border-rose-500 focus:border-rose-400'
                : 'border-slate-800 focus:border-blue-500'
            }`}
          />
        </div>

        {/* Main Objective */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              Primary Objective *
            </span>
            {errors.objective && (
              <span className="text-rose-400 normal-case font-normal text-xs">{errors.objective}</span>
            )}
          </label>
          <div className="flex flex-wrap gap-2">
            {OBJECTIVE_PRESETS.map((preset) => {
              const isSelected = formData.objective === preset;
              return (
                <button
                  type="button"
                  key={preset}
                  onClick={() => updateField('objective', preset)}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-md shadow-blue-500/20'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={formData.objective}
            onChange={(e) => updateField('objective', e.target.value)}
            placeholder="Or type a custom project objective..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              Project Description & Requirements *
            </label>
            <span className="text-[11px] text-slate-500">
              {formData.projectDesc.length} characters (min 10)
            </span>
          </div>
          <textarea
            rows={4}
            value={formData.projectDesc}
            onChange={(e) => updateField('projectDesc', e.target.value)}
            placeholder="Describe what your product does, key problems it solves, and any specific technical preferences or constraints..."
            className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
              errors.projectDesc
                ? 'border-rose-500 focus:border-rose-400'
                : 'border-slate-800 focus:border-blue-500'
            }`}
          />
          {errors.projectDesc && (
            <p className="text-rose-400 text-xs">{errors.projectDesc}</p>
          )}
        </div>

        {/* Target Audience */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Target Audience *
            </span>
            {errors.targetAudience && (
              <span className="text-rose-400 normal-case font-normal text-xs">{errors.targetAudience}</span>
            )}
          </label>
          <div className="flex flex-wrap gap-2">
            {AUDIENCE_PRESETS.map((aud) => {
              const isSelected = formData.targetAudience === aud;
              return (
                <button
                  type="button"
                  key={aud}
                  onClick={() => updateField('targetAudience', aud)}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 font-semibold shadow-md shadow-indigo-500/20'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {aud}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => updateField('targetAudience', e.target.value)}
            placeholder="Or specify target audience (e.g. Hospital administrators, retail investors)..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Important Features Required */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <ListPlus className="w-4 h-4 text-blue-400" />
            Key Features or Technical Requirements (Optional)
          </label>

          {/* Active Features */}
          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
              {formData.features.map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800/60 text-blue-300 text-xs font-medium"
                >
                  {feat}
                  <button
                    type="button"
                    onClick={() => removeFeature(feat)}
                    className="hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Custom Feature Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              onKeyDown={handleFeatureKeyDown}
              placeholder="Type a feature and press Enter (e.g. SSO, WebSockets, Export PDF)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={handleAddFeatureClick}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] text-slate-500 block">Popular recommendations (click to add):</span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_FEATURE_SUGGESTIONS.map((sug) => {
                const alreadyAdded = formData.features.includes(sug);
                return (
                  <button
                    type="button"
                    key={sug}
                    disabled={alreadyAdded}
                    onClick={() => addFeature(sug)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      alreadyAdded
                        ? 'opacity-40 bg-slate-950 border-slate-900 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-blue-300 hover:border-slate-700'
                    }`}
                  >
                    + {sug}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StepProjectInfo;
