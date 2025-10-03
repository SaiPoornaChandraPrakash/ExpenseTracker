import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 450px;
`;

const AuthLogo = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LogoIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

const LogoText = styled.h1`
  color: white;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LogoSubtext = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin: 5px 0 0 0;
  font-size: 14px;
`;

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <AuthContainer>
      <AuthCard>
        <AuthLogo>
          <LogoIcon>💰</LogoIcon>
          <LogoText>ExpenseTracker</LogoText>
          <LogoSubtext>Track expenses efficiently with AI assistance</LogoSubtext>
        </AuthLogo>

        {isLogin ? (
          <LoginForm onSwitchToRegister={switchToRegister} />
        ) : (
          <RegisterForm onSwitchToLogin={switchToLogin} />
        )}
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthPage;