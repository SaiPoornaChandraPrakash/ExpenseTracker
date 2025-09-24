import React from 'react';
import styled from 'styled-components';

const ButtonBase = styled.button<{
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  size: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
}>`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => props.fullWidth && 'width: 100%;'}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'padding: 6px 12px; font-size: 12px;';
      case 'large':
        return 'padding: 12px 24px; font-size: 16px;';
      default:
        return 'padding: 8px 16px; font-size: 14px;';
    }
  }}
  
  ${props => {
    if (props.disabled) {
      return `
        opacity: 0.6;
        cursor: not-allowed;
        background-color: #e9ecef;
        color: #6c757d;
      `;
    }
    
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #007bff;
          color: white;
          &:hover { background-color: #0056b3; }
          &:active { background-color: #004085; }
        `;
      case 'secondary':
        return `
          background-color: #6c757d;
          color: white;
          &:hover { background-color: #545b62; }
          &:active { background-color: #424649; }
        `;
      case 'danger':
        return `
          background-color: #dc3545;
          color: white;
          &:hover { background-color: #c82333; }
          &:active { background-color: #a71e2a; }
        `;
      case 'success':
        return `
          background-color: #28a745;
          color: white;
          &:hover { background-color: #1e7e34; }
          &:active { background-color: #155724; }
        `;
      default:
        return '';
    }
  }}
`;

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  style
}) => {
  return (
    <ButtonBase
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      className={className}
      style={style}
    >
      {loading && <span>⏳</span>}
      {children}
    </ButtonBase>
  );
};

export default Button;