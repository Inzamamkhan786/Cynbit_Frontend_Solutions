import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  Clock, 
  RotateCcw,
  ArrowRight,
  Printer
} from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

const StepSuccess = () => {
  const { submissionResult, clearDraft } = useDiscovery();
  const [copied, setCopied] = useState(false);

  if (!submissionResult) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(submissionResult.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8 text-center animate-in zoom-in-95 duration-300">
      
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[2px] mx-auto shadow-2xl shadow-emerald-500/20">
        <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          Enquiry Successfully Registered
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
          Discovery Brief Submitted!
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Thank you, <strong className="text-white">{submissionResult.fullName}</strong>. Your project requirements for <strong className="text-white">"{submissionResult.projectName}"</strong> have been ingested into our engineering review pipeline.
        </p>
      </div>

      {/* Reference ID Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-blue-500/40 shadow-xl shadow-blue-500/10 space-y-3 relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
          Your Unique Reference ID
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-2xl md:text-3xl font-black text-cyan-400 tracking-wider">
            {submissionResult.referenceId}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Copy Reference ID"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-500">
          Save this Reference ID to track the real-time review progress of your proposal.
        </p>
      </div>

      {/* SLA Guarantee */}
      <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40 text-left flex items-start gap-3.5 max-w-lg mx-auto">
        <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold text-white block">24-Hour Response Sync</span>
          <p className="text-slate-400 leading-relaxed">
            A Senior Technical Architect from Cynbit will analyze your feasibility, prepare high-level architecture insights, and reach out to <span className="text-blue-300">{submissionResult.email}</span> within 24 hours.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to={`/track?ref=${submissionResult.referenceId}`}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
        >
          <Search className="w-4 h-4" />
          Track Project Status
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all border border-slate-700"
        >
          <Printer className="w-4 h-4" />
          Print / Save Summary
        </button>

        <button
          type="button"
          onClick={clearDraft}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all border border-slate-800"
        >
          <RotateCcw className="w-4 h-4" />
          Start New Discovery
        </button>
      </div>

    </div>
  );
};

export default StepSuccess;
