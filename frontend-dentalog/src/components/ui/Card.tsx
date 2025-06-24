import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const paddingClass = `card-padding-${padding}`;
  const hoverClass = hover ? 'card-hover' : '';

  return (
    <div className={`card ${paddingClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};
