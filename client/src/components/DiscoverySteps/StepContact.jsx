import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

const StepContact = () => {
  const { formData, updateField, errors } = useDiscovery();

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          Step 4 of 5: Direct Communication
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
          Where should we send your architectural brief?
        </h2>
        <p className="text-sm text-slate-400">
          Our senior engineering leads review incoming discoveries and reply directly within 24 hours.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-5">
        
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Full Name *
            </span>
            {errors.fullName && (
              <span className="text-rose-400 normal-case font-normal text-xs">{errors.fullName}</span>
            )}
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="e.g. Vikramaditya Rathore"
            className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
              errors.fullName
                ? 'border-rose-500 focus:border-rose-400'
                : 'border-slate-800 focus:border-blue-500'
            }`}
          />
        </div>

        {/* Business Email & Phone (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Business Email */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                Work / Business Email *
              </span>
              {errors.email && (
                <span className="text-rose-400 normal-case font-normal text-xs">{errors.email}</span>
              )}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="e.g. vikram@enterprise.com"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
                errors.email
                  ? 'border-rose-500 focus:border-rose-400'
                  : 'border-slate-800 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                Phone Number *
              </span>
              {errors.phone && (
                <span className="text-rose-400 normal-case font-normal text-xs">{errors.phone}</span>
              )}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+91 98290 12345"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
                errors.phone
                  ? 'border-rose-500 focus:border-rose-400'
                  : 'border-slate-800 focus:border-blue-500'
              }`}
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            Company or Organization Name (Optional)
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => updateField('company', e.target.value)}
            placeholder="e.g. NovaScale AI Corp, Solo Founder"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Confidentiality Notice */}
        <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40 flex items-start gap-3">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Strict IP & Non-Disclosure Guarantee:</strong> All project concepts and communication are treated with enterprise confidentiality under Cynbit’s standard NDA protocols.
          </p>
        </div>

      </div>
    </div>
  );
};

export default StepContact;
