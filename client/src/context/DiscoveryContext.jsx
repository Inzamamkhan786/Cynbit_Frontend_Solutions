import React, { createContext, useContext, useState, useEffect } from 'react';

const DiscoveryContext = createContext(null);

const STORAGE_KEY = 'cynbit_discovery_draft_v1';

const initialFormData = {
  services: [],
  projectName: '',
  projectDesc: '',
  objective: '',
  targetAudience: '',
  features: [],
  budget: '',
  timeline: '',
  fullName: '',
  email: '',
  phone: '',
  company: '',
};

export const DiscoveryProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...initialFormData, ...JSON.parse(saved) } : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Auto-save draft changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save discovery draft:', e);
    }
  }, [formData]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for field if any
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const updatedServices = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updatedServices };
    });
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: null }));
    }
  };

  const preSelectService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service) ? prev.services : [...prev.services, service],
    }));
  };

  const addFeature = (feature) => {
    const trimmed = feature.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, trimmed],
      }));
    }
  };

  const removeFeature = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  // Step Validation logic
  const validateCurrentStep = (stepNumber = currentStep) => {
    const stepErrors = {};

    if (stepNumber === 1) {
      if (!formData.services || formData.services.length === 0) {
        stepErrors.services = 'Please select at least one service to continue.';
      }
    } else if (stepNumber === 2) {
      if (!formData.projectName || formData.projectName.trim().length < 2) {
        stepErrors.projectName = 'Project name is required (min 2 characters).';
      }
      if (!formData.objective || formData.objective.trim().length < 2) {
        stepErrors.objective = 'Please select or describe the main project objective.';
      }
      if (!formData.projectDesc || formData.projectDesc.trim().length < 10) {
        stepErrors.projectDesc = 'Please describe your project (minimum 10 characters).';
      }
      if (!formData.targetAudience || formData.targetAudience.trim().length < 2) {
        stepErrors.targetAudience = 'Please specify the target audience for this project.';
      }
    } else if (stepNumber === 3) {
      if (!formData.budget) {
        stepErrors.budget = 'Please select an estimated budget tier.';
      }
      if (!formData.timeline) {
        stepErrors.timeline = 'Please select your target launch timeline.';
      }
    } else if (stepNumber === 4) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        stepErrors.fullName = 'Full name is required.';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email.trim())) {
        stepErrors.email = 'Please provide a valid business email address.';
      }
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
      if (!formData.phone || !phoneRegex.test(formData.phone.trim())) {
        stepErrors.phone = 'Please provide a valid contact phone number.';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jumpToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 5) {
      setCurrentStep(stepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
    setCurrentStep(1);
    setSubmissionResult(null);
    setErrors({});
  };

  return (
    <DiscoveryContext.Provider
      value={{
        formData,
        currentStep,
        errors,
        submissionResult,
        setSubmissionResult,
        updateField,
        toggleService,
        preSelectService,
        addFeature,
        removeFeature,
        nextStep,
        prevStep,
        jumpToStep,
        clearDraft,
        validateCurrentStep,
      }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
};

export const useDiscovery = () => {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }
  return context;
};
