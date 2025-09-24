import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const InputField = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : '#ddd'};
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease-in-out;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : '#007bff'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
  }
  
  &::placeholder {
    color: #999;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : '#ddd'};
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s ease-in-out;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : '#007bff'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
  }
  
  &::placeholder {
    color: #999;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorText = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const HelpText = styled.span`
  color: #666;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helpText,
  disabled = false,
  required = false,
  multiline = false,
  rows = 3,
  className
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputContainer className={className}>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: '#dc3545' }}> *</span>}
        </Label>
      )}
      {multiline ? (
        <TextArea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          hasError={!!error}
          disabled={disabled}
          required={required}
          rows={rows}
        />
      ) : (
        <InputField
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          hasError={!!error}
          disabled={disabled}
          required={required}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
      {!error && helpText && <HelpText>{helpText}</HelpText>}
    </InputContainer>
  );
};

export default Input;