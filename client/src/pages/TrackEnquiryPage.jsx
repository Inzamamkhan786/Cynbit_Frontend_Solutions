import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Mail,
  Phone
} from 'lucide-react';
import { api } from '../services/api';

const STATUS_PROGRESS = {
  New: 1,
  Contacted: 2,
  'In Progress': 3,
  Completed: 4,
  Rejected: 0,
};

const PIPELINE_STAGES = [
  { step: 1, name: 'Enquiry Ingested', desc: 'Requirements recorded in architectural queue' },
  { step: 2, name: 'Architect Outreach', desc: 'Direct technical contact established' },
  { step: 3, name: 'Deep Architecture', desc: 'System blueprints and feasibility in development' },
  { step: 4, name: 'Production Kickoff', desc: 'Active engineering sprints initiated' },
];

const TrackEnquiryPage = () => {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';
  const [referenceId, setReferenceId] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState(null);

  const fetchEnquiry = async (ref) => {
    if (!ref.trim()) return;
    setLoading(true);
    setError(null);
    setEnquiry(null);

    try {
      const response = await api.enquiries.track(ref.trim());
      if (response.success && response.enquiry) {
        setEnquiry(response.enquiry);
      } else {
        throw new Error(response.message || 'No enquiry found with this Reference ID');
      }
    } catch (err) {
      setError(err.message || 'Unable to locate enquiry. Please double check the ID format (e.g. CYN-2026-ABC123).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchEnquiry(initialRef);
    }
  }, [initialRef]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiry(referenceId);
  };

  const currentStage = enquiry ? STATUS_PROGRESS[enquiry.status] || 1 : 1;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'In Progress':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#070a13]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Search className="w-3.5 h-3.5" />
            Client Transparency Portal
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
            Track Project Discovery Status
          </h1>
          <p className="text-sm text-slate-400">
            Enter your unique reference ID to verify your position in Cynbit’s engineering queue.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="max-w-xl mx-auto bg-slate-900/70 p-3 rounded-2xl border border-slate-800 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value.toUpperCase())}
              placeholder="Enter Reference ID (e.g. CYN-2026-A8F21D)"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 uppercase tracking-wider"
            />
            <button
              type="submit"
              disabled={loading || !referenceId.trim()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Track
            </button>
          </form>
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block">Reference Lookup Notice</span>
              <p className="text-xs leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Enquiry Result Details */}
        {enquiry && (
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-8 animate-in fade-in duration-300 shadow-2xl">
            
            {/* Top Status Card Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-mono text-slate-500 block mb-1">
                  REFERENCE: {enquiry.referenceId}
                </span>
                <h2 className="text-2xl font-heading font-black text-white">
                  {enquiry.projectName}
                </h2>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(enquiry.status)}`}>
                  Status: {enquiry.status}
                </span>
              </div>
            </div>

            {/* Visual Pipeline Progression */}
            {enquiry.status !== 'Rejected' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Architectural Pipeline Progression
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    Stage {currentStage} of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {PIPELINE_STAGES.map((stage) => {
                    const isDone = currentStage > stage.step;
                    const isCurrent = currentStage === stage.step;

                    return (
                      <div
                        key={stage.step}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-500/20'
                            : isDone
                            ? 'bg-slate-950 border-emerald-500/40'
                            : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-slate-400">0{stage.step}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : isCurrent ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                          )}
                        </div>
                        <h4 className={`text-xs font-bold mb-1 ${isCurrent ? 'text-white' : isDone ? 'text-emerald-300' : 'text-slate-400'}`}>
                          {stage.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300">
                This project enquiry has been closed or marked as inactive by our review squad. If you have questions, please reach out to our team directly.
              </div>
            )}

            {/* Services & Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  Engaged Disciplines
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {enquiry.services.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/50 border border-blue-800/40 text-blue-300 text-xs font-medium"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Timeline Log
                </span>
                <div className="space-y-1 text-slate-300">
                  <div>
                    <span className="text-slate-500">Submitted:</span>{' '}
                    {new Date(enquiry.submittedAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="text-slate-500">Last Status Sync:</span>{' '}
                    {new Date(enquiry.lastUpdated).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Architect Contact Footer */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-slate-400">
                Need urgent assistance or have supplementary technical documents?
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="mailto:opportunities@cynbit.in"
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> opportunities@cynbit.in
                </a>
                <a
                  href="tel:+918947962667"
                  className="text-slate-300 hover:text-white font-semibold flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" /> +91 89479 62667
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrackEnquiryPage;
