import React from 'react';

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureStep {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface LeadForm {
  email: string;
  labType: string;
  standard: string;
  instrumentCount: string;
  painPoint: string;
}