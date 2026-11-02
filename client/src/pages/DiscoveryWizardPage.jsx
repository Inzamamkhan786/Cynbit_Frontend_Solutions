import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  RotateCcw,
  Layers,
  FileText,
  IndianRupee,
  User,
  ClipboardCheck,
  ShieldCheck
} from 'lucide-react';
import { useDiscovery } from '../context/DiscoveryContext';
import StepServices from '../components/DiscoverySteps/StepServices';
import StepProjectInfo from '../components/DiscoverySteps/StepProjectInfo';
import StepBudgetTimeline from '../components/DiscoverySteps/StepBudgetTimeline';
import StepContact from '../components/DiscoverySteps/StepContact';
import StepReview from '../components/DiscoverySteps/StepReview';
import StepSuccess from '../components/DiscoverySteps/StepSuccess';

const WIZARD_STEPS = [
  { step: 1, title: 'Services', icon: Layers },
  { step: 2, title: 'Scope', icon: FileText },
  { step: 3, title: 'Investment', icon: IndianRupee },
  { step: 4, title: 'Contact', icon: User },
  { step: 5, title: 'Review', icon: ClipboardCheck },
];

const DiscoveryWizardPage = () => {
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    jumpToStep, 
    clearDraft, 
    submissionResult 
  } = useDiscovery();

  const progressPercentage = ((currentStep - 1) / 4) * 100;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[#070a13]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* If submission is successful, show StepSuccess */}
        {submissionResult ? (
          <StepSuccess />
        ) : (
          <>
            {/* Top Bar with Draft Status & Reset */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Draft automatically saved locally</span>
              </div>
              <button
                type="button"
                onClick={clearDraft}
                className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
                title="Reset wizard draft"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Draft
              </button>
            </div>

            {/* Stepper Navigation */}
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2 md:gap-4">
                {WIZARD_STEPS.map((s) => {
                  const isCompleted = currentStep > s.step;
                  const isCurrent = currentStep === s.step;
                  const Icon = s.icon;

                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => isCompleted && jumpToStep(s.step)}
                      disabled={!isCompleted && !isCurrent}
                      className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-blue-950/60 border-blue-500 shadow-md shadow-blue-500/20'
                          : isCompleted
                          ? 'bg-slate-900/60 border-emerald-500/40 hover:border-emerald-500 cursor-pointer'
                          : 'bg-slate-950/40 border-slate-800/60 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          0{s.step}
                        </span>
                        {isCompleted ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-blue-400' : 'text-slate-500'}`} />
                        )}
                      </div>
                      <span className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : isCompleted ? 'text-emerald-300' : 'text-slate-400'}`}>
                        {s.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(10, progressPercentage)}%` }}
                ></div>
              </div>
            </div>

            {/* Step Body */}
            <div className="pt-2">
              {currentStep === 1 && <StepServices />}
              {currentStep === 2 && <StepProjectInfo />}
              {currentStep === 3 && <StepBudgetTimeline />}
              {currentStep === 4 && <StepContact />}
              {currentStep === 5 && <StepReview />}
            </div>

            {/* Bottom Step Controller (for steps 1-4) */}
            {currentStep < 5 && (
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={prevStep}
                  className={`px-6 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    currentStep === 1
                      ? 'opacity-30 border-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="text-xs text-slate-500 hidden sm:block">
                  Step {currentStep} of 5
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all active:scale-95"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default DiscoveryWizardPage;
