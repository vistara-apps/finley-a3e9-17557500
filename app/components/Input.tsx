
"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'withLabel';
  label?: string;
}

export function Input({ 
  variant = 'default',
  label,
  className = '',
  ...props 
}: InputProps) {
  if (variant === 'withLabel' && label) {
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-text">{label}</label>
        <input 
          className={`input-field w-full ${className}`}
          {...props}
        />
      </div>
    );
  }

  return (
    <input 
      className={`input-field ${className}`}
      {...props}
    />
  );
}
