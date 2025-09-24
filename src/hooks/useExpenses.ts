import { useState, useEffect } from 'react';
import { ExpenseChart } from '../types';
import ExpenseService from '../services/expenseService';

interface UseExpensesReturn {
  charts: ExpenseChart[];
  isLoading: boolean;
  error: string | null;
  refreshCharts: () => Promise<void>;
  generateChart: (prompt: string) => Promise<ExpenseChart | null>;
}

export const useExpenses = (): UseExpensesReturn => {
  const [charts, setCharts] = useState<ExpenseChart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await ExpenseService.getExpenseCharts();
      
      if (result.success && result.data) {
        setCharts(result.data);
      } else {
        setError(result.error || 'Failed to fetch expense charts');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching expense charts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCharts = async () => {
    await fetchCharts();
  };

  const generateChart = async (prompt: string): Promise<ExpenseChart | null> => {
    try {
      const result = await ExpenseService.generateChartWithLLM(prompt);
      
      if (result.success && result.data) {
        // Add the new chart to the existing charts
        setCharts(prev => [...prev, result.data!]);
        return result.data;
      } else {
        setError(result.error || 'Failed to generate chart');
        return null;
      }
    } catch (err) {
      setError('An unexpected error occurred while generating chart');
      console.error('Error generating chart:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchCharts();
  }, []);

  return {
    charts,
    isLoading,
    error,
    refreshCharts,
    generateChart,
  };
};

export default useExpenses;