import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div<{ variant?: 'error' | 'warning' | 'info' }>`
  padding: 12px 16px;
  border-radius: 6px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  
  ${props => {
    switch (props.variant) {
      case 'warning':
        return `
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
        `;
      case 'info':
        return `
          background-color: #d1ecf1;
          border: 1px solid #bee5eb;
          color: #0c5460;
        `;
      default: // error
        return `
          background-color: #f8d7da;
          border: 1px solid #f1aeb5;
          color: #721c24;
        `;
    }
  }}
`;

const ErrorIcon = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;

const ErrorText = styled.span`
  flex: 1;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  margin-left: 10px;
  
  &:hover {
    opacity: 1;
  }
`;

interface ErrorMessageProps {
  message: string;
  variant?: 'error' | 'warning' | 'info';
  onClose?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = 'error',
  onClose,
  className
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  return (
    <ErrorContainer variant={variant} className={className}>
      <ErrorIcon>{getIcon()}</ErrorIcon>
      <ErrorText>{message}</ErrorText>
      {onClose && (
        <CloseButton onClick={onClose}>
          ×
        </CloseButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorMessage;