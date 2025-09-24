import React, { useState } from 'react';
import styled from 'styled-components';
import { LoginCredentials } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import ErrorMessage from '../common/ErrorMessage';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-weight: 600;
`;

const StyledForm = styled.form`
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

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<Partial<LoginCredentials>>({});

  const validateForm = (): boolean => {
    const errors: Partial<LoginCredentials> = {};

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

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    clearError();
    const success = await login(credentials);
    
    if (!success) {
      // Error is already set in the auth context
      console.error('Login failed');
    }
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>Sign In</LoginTitle>
      
      {error && <ErrorMessage message={error} onClose={clearError} />}
      
      <StyledForm onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          value={credentials.password}
          onChange={(value) => handleInputChange('password', value)}
          error={validationErrors.password}
          required
        />
        
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Sign In
        </Button>
      </StyledForm>
      
      <SwitchText>
        Don't have an account?{' '}
        <SwitchLink onClick={onSwitchToRegister}>
          Sign up here
        </SwitchLink>
      </SwitchText>
    </LoginContainer>
  );
};

export default LoginForm;