import axios from 'axios';
import { ExpenseChart, ExpenseItem, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ExpenseService {
  static async getExpenseCharts(): Promise<ApiResponse<ExpenseChart[]>> {
    try {
      const response = await api.get('/expenses/charts');
      return { success: true, data: response.data };
    } catch (error: any) {
      // For development, return mock data if API is not available
      if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
        return { success: true, data: this.getMockChartData() };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch expense charts' 
      };
    }
  }

  static async getExpenses(): Promise<ApiResponse<ExpenseItem[]>> {
    try {
      const response = await api.get('/expenses');
      return { success: true, data: response.data };
    } catch (error: any) {
      // For development, return mock data if API is not available
      if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
        return { success: true, data: this.getMockExpenseData() };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch expenses' 
      };
    }
  }

  static async generateChartWithLLM(prompt: string): Promise<ApiResponse<ExpenseChart>> {
    try {
      const response = await api.post('/expenses/generate-chart', { prompt });
      return { success: true, data: response.data };
    } catch (error: any) {
      // For development, return mock data if API is not available
      if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
        return { success: true, data: this.getMockGeneratedChart(prompt) };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to generate chart with LLM' 
      };
    }
  }

  // Mock data for development
  private static getMockChartData(): ExpenseChart[] {
    return [
      {
        id: '1',
        type: 'pie',
        title: 'Expenses by Category (This Month)',
        period: 'monthly',
        data: [
          { name: 'Food & Dining', value: 850, color: '#FF6384' },
          { name: 'Transportation', value: 420, color: '#36A2EB' },
          { name: 'Utilities', value: 320, color: '#FFCE56' },
          { name: 'Entertainment', value: 280, color: '#4BC0C0' },
          { name: 'Healthcare', value: 150, color: '#9966FF' },
          { name: 'Shopping', value: 540, color: '#FF9F40' },
        ]
      },
      {
        id: '2',
        type: 'bar',
        title: 'Monthly Expense Trends',
        period: 'monthly',
        data: [
          { name: 'Jan', value: 2100 },
          { name: 'Feb', value: 1950 },
          { name: 'Mar', value: 2300 },
          { name: 'Apr', value: 2150 },
          { name: 'May', value: 2400 },
          { name: 'Jun', value: 2200 },
        ]
      },
      {
        id: '3',
        type: 'line',
        title: 'Daily Expenses (This Week)',
        period: 'daily',
        data: [
          { name: 'Mon', value: 85 },
          { name: 'Tue', value: 120 },
          { name: 'Wed', value: 95 },
          { name: 'Thu', value: 140 },
          { name: 'Fri', value: 110 },
          { name: 'Sat', value: 180 },
          { name: 'Sun', value: 160 },
        ]
      }
    ];
  }

  private static getMockExpenseData(): ExpenseItem[] {
    return [
      { id: '1', category: 'Food & Dining', amount: 25.50, date: '2024-01-15', description: 'Lunch at cafe' },
      { id: '2', category: 'Transportation', amount: 45.00, date: '2024-01-14', description: 'Gas for car' },
      { id: '3', category: 'Utilities', amount: 120.00, date: '2024-01-13', description: 'Electricity bill' },
      { id: '4', category: 'Entertainment', amount: 35.00, date: '2024-01-12', description: 'Movie tickets' },
      { id: '5', category: 'Shopping', amount: 89.99, date: '2024-01-11', description: 'Clothing purchase' },
    ];
  }

  private static getMockGeneratedChart(prompt: string): ExpenseChart {
    return {
      id: `generated-${Date.now()}`,
      type: 'bar',
      title: `Generated Chart: ${prompt}`,
      period: 'monthly',
      data: [
        { name: 'Category A', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category B', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category C', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category D', value: Math.floor(Math.random() * 500) + 100 },
      ]
    };
  }
}

export default ExpenseService;