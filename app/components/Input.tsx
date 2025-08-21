"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'withLabel';
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ 
  variant = 'default',
  label,
  className = '',
  error,
  helperText,
  id = `input-${Math.random().toString(36).substring(2, 9)}`,
  ...props 
}: InputProps) {
  const inputClasses = `input-field ${error ? 'border-red-500 focus:border-red-500 focus:shadow-error' : ''} ${className}`;
  const inputId = props.id || id;

  if (variant === 'withLabel' && label) {
    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="text-sm font-medium text-text">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input 
          id={inputId}
          className={`${inputClasses} w-full`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-secondary-text mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <input 
        id={inputId}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="text-sm text-secondary-text mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
