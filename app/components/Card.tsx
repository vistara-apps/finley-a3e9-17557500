
"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const baseClasses = variant === 'elevated' ? 'card-elevated' : 'card';
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
