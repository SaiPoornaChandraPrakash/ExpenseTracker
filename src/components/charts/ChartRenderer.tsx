import React from 'react';
import { ExpenseChart } from '../../types';
import ExpensePieChart from './ExpensePieChart';
import ExpenseBarChart from './ExpenseBarChart';
import ExpenseLineChart from './ExpenseLineChart';

interface ChartRendererProps {
  chart: ExpenseChart;
  className?: string;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({ chart, className }) => {
  switch (chart.type) {
    case 'pie':
      return (
        <ExpensePieChart
          data={chart.data}
          title={chart.title}
          className={className}
        />
      );
    case 'bar':
      return (
        <ExpenseBarChart
          data={chart.data}
          title={chart.title}
          className={className}
        />
      );
    case 'line':
      return (
        <ExpenseLineChart
          data={chart.data}
          title={chart.title}
          className={className}
        />
      );
    default:
      return (
        <div>Unsupported chart type: {chart.type}</div>
      );
  }
};

export default ChartRenderer;