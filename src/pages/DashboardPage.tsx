import React from 'react';
import styled from 'styled-components';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ExpenseCharts from '../components/dashboard/ExpenseCharts';
import ChatBox from '../components/chat/ChatBox';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const DashboardContent = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 15px;
  }
`;

const ChartsSection = styled.section`
  background: transparent;
`;

const ChatSection = styled.section`
  position: sticky;
  top: 80px;
  height: fit-content;
  
  @media (max-width: 1024px) {
    position: static;
    order: -1;
  }
`;

const WelcomeSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 28px;
  font-weight: 600;
`;

const WelcomeText = styled.p`
  margin: 0;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const FeatureCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const FeatureTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 12px;
`;

export const DashboardPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardHeader />
      
      <DashboardContent>
        <ChartsSection>
          <WelcomeSection>
            <WelcomeTitle>Welcome to ExpenseTracker!</WelcomeTitle>
            <WelcomeText>
              Get intelligent insights into your spending patterns with AI-powered analytics.
              Chat with our assistant to explore your expenses and get personalized recommendations.
            </WelcomeText>
            
            <FeatureGrid>
              <FeatureCard>
                <FeatureIcon>📊</FeatureIcon>
                <FeatureTitle>Smart Analytics</FeatureTitle>
                <FeatureDescription>
                  AI-generated charts and insights
                </FeatureDescription>
              </FeatureCard>
              
              <FeatureCard>
                <FeatureIcon>💬</FeatureIcon>
                <FeatureTitle>AI Assistant</FeatureTitle>
                <FeatureDescription>
                  Ask questions about your expenses
                </FeatureDescription>
              </FeatureCard>
              
              <FeatureCard>
                <FeatureIcon>📱</FeatureIcon>
                <FeatureTitle>Responsive Design</FeatureTitle>
                <FeatureDescription>
                  Works perfectly on all devices
                </FeatureDescription>
              </FeatureCard>
            </FeatureGrid>
          </WelcomeSection>
          
          <ExpenseCharts />
        </ChartsSection>

        <ChatSection>
          <ChatBox />
        </ChatSection>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;