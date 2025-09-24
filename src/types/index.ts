// User authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Expense data types
export interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface ExpenseChart {
  id: string;
  type: 'pie' | 'bar' | 'line';
  title: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Chat types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component props interfaces
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}