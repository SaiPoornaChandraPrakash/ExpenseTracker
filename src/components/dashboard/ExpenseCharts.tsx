import React from 'react';
import styled from 'styled-components';
import { useExpenses } from '../../hooks/useExpenses';
import ChartRenderer from '../charts/ChartRenderer';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Button from '../common/Button';

const ChartsContainer = styled.div`
  padding: 20px;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ChartsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const ChartsTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyStateTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
  font-size: 20px;
`;

const EmptyStateText = styled.p`
  margin: 0 0 20px 0;
  font-size: 16px;
`;

interface ExpenseChartsProps {
  className?: string;
}

export const ExpenseCharts: React.FC<ExpenseChartsProps> = ({ className }) => {
  const { charts, isLoading, error, refreshCharts } = useExpenses();

  const handleRefresh = async () => {
    await refreshCharts();
  };

  if (isLoading && charts.length === 0) {
    return (
      <ChartsContainer className={className}>
        <LoadingSpinner text="Loading your expense charts..." size="large" />
      </ChartsContainer>
    );
  }

  if (error && charts.length === 0) {
    return (
      <ChartsContainer className={className}>
        <ErrorMessage message={error} />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </ChartsContainer>
    );
  }

  return (
    <ChartsContainer className={className}>
      <ChartsHeader>
        <ChartsTitle>Your Expense Analytics</ChartsTitle>
        <Button 
          onClick={handleRefresh}
          loading={isLoading}
          variant="secondary"
          size="small"
        >
          🔄 Refresh
        </Button>
      </ChartsHeader>

      {error && (
        <ErrorMessage 
          message={error} 
          variant="warning"
        />
      )}

      {charts.length > 0 ? (
        <ChartsGrid>
          {charts.map((chart) => (
            <ChartRenderer key={chart.id} chart={chart} />
          ))}
        </ChartsGrid>
      ) : (
        <EmptyState>
          <EmptyStateIcon>📊</EmptyStateIcon>
          <EmptyStateTitle>No Charts Available</EmptyStateTitle>
          <EmptyStateText>
            Your expense charts will appear here once your data is processed.
          </EmptyStateText>
          <Button onClick={handleRefresh}>Generate Charts</Button>
        </EmptyState>
      )}
    </ChartsContainer>
  );
};

export default ExpenseCharts;