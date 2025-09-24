import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
`;

const LogoIcon = styled.span`
  font-size: 24px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #28a745);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const UserName = styled.span`
  color: #333;
  font-weight: 500;
  font-size: 14px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const WelcomeText = styled.span`
  color: #666;
  font-size: 12px;
  margin-right: 10px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

interface DashboardHeaderProps {
  className?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ className }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <HeaderContainer className={className}>
      <Logo>
        <LogoIcon>💰</LogoIcon>
        <span>ExpenseTracker</span>
      </Logo>

      <UserSection>
        <WelcomeText>Welcome back,</WelcomeText>
        <UserInfo>
          <UserAvatar>
            {user ? getUserInitials(user.name) : 'U'}
          </UserAvatar>
          <UserName>{user?.name}</UserName>
        </UserInfo>
        <Button variant="secondary" size="small" onClick={handleLogout}>
          Sign Out
        </Button>
      </UserSection>
    </HeaderContainer>
  );
};

export default DashboardHeader;