"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  id?: string;
}

export function Toggle({ 
  checked, 
  onChange, 
  disabled = false,
  className = '',
  label = '',
  id = `toggle-${Math.random().toString(36).substring(2, 9)}`
}: ToggleProps) {
  return (
    <div className="flex items-center">
      {label && (
        <label htmlFor={id} className="mr-2 text-sm font-medium text-text cursor-pointer">
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || (checked ? 'Enabled' : 'Disabled')}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            !disabled && onChange(!checked);
          }
        }}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
          ${checked ? 'bg-accent' : 'bg-border'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-base
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
          aria-hidden="true"
        />
        <span className="sr-only">{checked ? 'Enabled' : 'Disabled'}</span>
      </button>
    </div>
  );
}
