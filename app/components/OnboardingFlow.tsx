
"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Finley",
      content: "Your AI CFO is here to hunt down hidden fees and negotiate better deals on your behalf.",
      action: "Continue"
    },
    {
      title: "Privacy First",
      content: "We use secure, read-only connections to analyze your finances. Your data stays encrypted and protected.",
      action: "I Understand"
    },
    {
      title: "Choose Your Plan",
      content: "Start free with basic fee discovery, or unlock advanced features with Pro and Premium tiers.",
      action: "Start Free"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-lg animate-slide-up">
      <div className="text-center space-y-md">
        <div className="w-16 h-16 bg-accent rounded-lg mx-auto flex items-center justify-center mb-md">
          <span className="text-bg text-2xl font-bold">F</span>
        </div>
        <h1 className="text-display">{steps[currentStep].title}</h1>
        <p className="text-body max-w-sm mx-auto">
          {steps[currentStep].content}
        </p>
      </div>

      {currentStep === 2 && (
        <div className="space-y-md">
          <Card variant="elevated">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-heading text-base">Free</h3>
                <p className="text-caption">Basic fee discovery</p>
              </div>
              <div className="text-accent font-semibold">$0/mo</div>
            </div>
          </Card>
          
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-heading text-base">Pro</h3>
                <p className="text-caption">Subscription optimization & bill negotiation</p>
              </div>
              <div className="text-text font-semibold">$10/mo</div>
            </div>
          </Card>
          
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-heading text-base">Premium</h3>
                <p className="text-caption">Advanced debt reduction & CFO insights</p>
              </div>
              <div className="text-text font-semibold">$25/mo</div>
            </div>
          </Card>
        </div>
      )}

      <div className="space-y-md">
        <Button variant="primary" onClick={handleNext} className="w-full">
          {steps[currentStep].action}
        </Button>
        
        {currentStep > 0 && (
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full"
          >
            Back
          </Button>
        )}
      </div>

      <div className="flex justify-center space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-base ${
              index === currentStep ? 'bg-accent' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
