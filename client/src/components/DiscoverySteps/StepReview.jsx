import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Edit3, 
  Send, 
  Loader2, 
  AlertCircle,
  FileText,
  Layers,
  IndianRupee,
  Clock,
  User,
  Building,
  Target,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useDiscovery } from '../../context/DiscoveryContext';
import { api } from '../../services/api';

const StepReview = () => {
  const { 
    formData, 
    jumpToStep, 
    setSubmissionResult 
  } = useDiscovery();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        services: formData.services,
        projectName: formData.projectName,
        projectDesc: formData.projectDesc,
        objective: formData.objective,
        targetAudience: formData.targetAudience,
        features: formData.features,
        budget: formData.budget,
        timeline: formData.timeline,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
      };

      const response = await api.enquiries.create(payload);

      if (response.success && response.referenceId) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#38bdf8', '#818cf8', '#34d399'],
        });

        setSubmissionResult({
          referenceId: response.referenceId,
          enquiryId: response.enquiryId,
          createdAt: response.createdAt,
          projectName: formData.projectName,
          fullName: formData.fullName,
          email: formData.email,
        });
      } else {
        throw new Error(response.message || 'Failed to submit discovery inquiry');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (err.data && err.data.isDuplicate) {
        setSubmitError(
          `This enquiry was already submitted with Reference ID: ${err.data.referenceId}. You can track it using our tracking portal.`
        );
      } else {
        setSubmitError(
          err.message || 'An error occurred during submission. Please verify your connection and try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          Step 5 of 5: Architectural Review
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
          Review your project requirements
        </h2>
        <p className="text-sm text-slate-400">
          Double-check all entered parameters before submitting to Cynbit's lead engineering squad.
        </p>
      </div>

      {submitError && (
        <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800 text-rose-300 text-sm flex items-start gap-3 max-w-3xl mx-auto animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white block">Submission Alert</strong>
            <p className="text-xs leading-relaxed">{submitError}</p>
          </div>
        </div>
      )}

      {/* Review Cards Grid */}
      <div className="max-w-3xl mx-auto space-y-5">
        
        {/* Card 1: Selected Services */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              1. Selected Disciplines ({formData.services.length})
            </span>
            <button
              type="button"
              onClick={() => jumpToStep(1)}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.services.map((svc) => (
              <span
                key={svc}
                className="px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-medium"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2: Project Scope & Objectives */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              2. Project Scope & Architecture
            </span>
            <button
              type="button"
              onClick={() => jumpToStep(2)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Project Name:</span>
              <span className="font-bold text-white text-sm">{formData.projectName}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Primary Objective:</span>
              <span className="font-semibold text-slate-200">{formData.objective}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Target Audience:</span>
              <span className="font-semibold text-slate-200">{formData.targetAudience}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Key Features:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.features.length > 0 ? (
                  formData.features.map((f) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {f}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic">None specified (open architectural scoping)</span>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-500 block mb-1">Detailed Description:</span>
              <p className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                {formData.projectDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Investment & Velocity */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-400" />
              3. Budget & Timeline
            </span>
            <button
              type="button"
              onClick={() => jumpToStep(3)}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Budget Allocation:</span>
              <span className="font-bold text-white text-sm text-emerald-400">{formData.budget}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Target Launch Timeline:</span>
              <span className="font-bold text-white text-sm text-cyan-400">{formData.timeline}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Contact & Organization */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              4. Contact & Organization
            </span>
            <button
              type="button"
              onClick={() => jumpToStep(4)}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Full Name:</span>
              <span className="font-semibold text-white">{formData.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Business Email:</span>
              <span className="font-semibold text-white">{formData.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Phone Number:</span>
              <span className="font-semibold text-white">{formData.phone}</span>
            </div>
            {formData.company && (
              <div className="sm:col-span-3">
                <span className="text-slate-500 block mb-1">Company:</span>
                <span className="font-semibold text-white">{formData.company}</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit Action Banner */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            By submitting, your enquiry enters our prioritized architectural queue.
          </p>

          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Architecture Brief...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Confirm & Submit Project Discovery
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default StepReview;
