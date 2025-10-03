import React, { useState } from 'react';
import styled from 'styled-components';
import { RegisterCredentials } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import ErrorMessage from '../common/ErrorMessage';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const RegisterTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-weight: 600;
`;

const StyledRegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
`;

const SwitchLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  
  &:hover {
    color: #0056b3;
  }
`;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { register, isLoading, error, clearError } = useAuth();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<Partial<RegisterCredentials>>({});

  const validateForm = (): boolean => {
    const errors: Partial<RegisterCredentials> = {};

    if (!credentials.name.trim()) {
      errors.name = 'Name is required';
    } else if (credentials.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!credentials.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'Email is invalid';
    }

    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!credentials.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    clearError();
    const success = await register(credentials);
    
    if (!success) {
      // Error is already set in the auth context
      console.error('Registration failed');
    }
  };

  const handleInputChange = (field: keyof RegisterCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <RegisterContainer>
      <RegisterTitle>Create Account</RegisterTitle>
      
      {error && <ErrorMessage message={error} onClose={clearError} />}
      
      <StyledRegisterForm onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={credentials.name}
          onChange={(value) => handleInputChange('name', value)}
          error={validationErrors.name}
          required
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={(value) => handleInputChange('email', value)}
          error={validationErrors.email}
          required
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          value={credentials.password}
          onChange={(value) => handleInputChange('password', value)}
          error={validationErrors.password}
          helpText="Password must be at least 6 characters"
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={credentials.confirmPassword}
          onChange={(value) => handleInputChange('confirmPassword', value)}
          error={validationErrors.confirmPassword}
          required
        />
        
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Create Account
        </Button>
      </StyledRegisterForm>
      
      <SwitchText>
        Already have an account?{' '}
        <SwitchLink onClick={onSwitchToLogin}>
          Sign in here
        </SwitchLink>
      </SwitchText>
    </RegisterContainer>
  );
};

export default RegisterForm;