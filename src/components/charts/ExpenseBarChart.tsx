import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const CustomTooltip = styled.div`
  background: white;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
`;

interface BarChartData {
  name: string;
  value: number;
}

interface ExpenseBarChartProps {
  data: BarChartData[];
  title: string;
  className?: string;
}

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltip>
        <p><strong>{label}</strong></p>
        <p>Amount: ${payload[0].value.toFixed(2)}</p>
      </CustomTooltip>
    );
  }
  return null;
};

export const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ 
  data, 
  title,
  className 
}) => {
  return (
    <ChartContainer className={className}>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltipContent />} />
          <Bar 
            dataKey="value" 
            fill="#36A2EB"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ExpenseBarChart;