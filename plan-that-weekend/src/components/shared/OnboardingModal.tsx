import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadPreset?: () => void;
}

const steps = [
  {
    title: 'Welcome to Plan That Weekend!',
    description: 'Maximize your vacation time by finding long weekends and getting smart suggestions.',
    icon: (
      <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Add Your Holidays',
    description: 'Choose from country presets, upload a CSV file, or manually add individual holidays.',
    icon: (
      <svg className="w-16 h-16 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: 'Discover Long Weekends',
    description: 'See all your 3+ day weekends highlighted on the calendar with color-coded indicators.',
    icon: (
      <svg className="w-16 h-16 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Get Smart Suggestions',
    description: 'Our algorithm suggests the best days to take off for maximum vacation benefit.',
    icon: (
      <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export function OnboardingModal({ isOpen, onClose, onLoadPreset }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const handleQuickStart = () => {
    if (onLoadPreset) {
      onLoadPreset();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              {steps[currentStep]?.icon}
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              {steps[currentStep]?.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              {steps[currentStep]?.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-primary-600'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-600'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center gap-4">
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>

          <div className="flex gap-2">
            {currentStep === 0 && onLoadPreset && (
              <Button variant="secondary" onClick={handleQuickStart}>
                Quick Start
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
