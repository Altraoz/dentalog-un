import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import './Input.css';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'time';
  icon?: typeof LucideIcon;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon: Icon,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && (
          <div className="input-icon">
            <Icon className="icon" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`input-field ${Icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''}`}
        />
      </div>
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};
