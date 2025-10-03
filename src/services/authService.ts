import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User, ApiResponse } from '../types';

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

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, data: { user, token } };
    } catch (error: any) {
      // For development, use mock authentication when backend is not available
      if (error.code === 'ERR_CONNECTION_REFUSED' || error.message?.includes('Network Error')) {
        return this.mockLogin(credentials);
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  }

  static async register(credentials: RegisterCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await api.post('/auth/register', credentials);
      const { user, token } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, data: { user, token } };
    } catch (error: any) {
      // For development, use mock authentication when backend is not available
      if (error.code === 'ERR_CONNECTION_REFUSED' || error.message?.includes('Network Error')) {
        return this.mockRegister(credentials);
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  }

  static async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  static async verifyToken(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get('/auth/verify');
      return { success: true, data: response.data.user };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Token verification failed' 
      };
    }
  }

  static getStoredUser(): User | null {
    try {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }

  static getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  // Mock authentication methods for development
  private static mockLogin(credentials: LoginCredentials): ApiResponse<{ user: User; token: string }> {
    // Simple mock validation
    if (!credentials.email || !credentials.password) {
      return { success: false, error: 'Email and password are required' };
    }

    const mockUser: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0].replace(/[._]/g, ' '),
    };

    const mockToken = 'mock_token_' + Date.now();

    // Store in localStorage
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    return { success: true, data: { user: mockUser, token: mockToken } };
  }

  private static mockRegister(credentials: RegisterCredentials): ApiResponse<{ user: User; token: string }> {
    // Simple mock validation
    if (!credentials.name || !credentials.email || !credentials.password) {
      return { success: false, error: 'All fields are required' };
    }

    if (credentials.password !== credentials.confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }

    const mockUser: User = {
      id: '1',
      email: credentials.email,
      name: credentials.name,
    };

    const mockToken = 'mock_token_' + Date.now();

    // Store in localStorage
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    return { success: true, data: { user: mockUser, token: mockToken } };
  }
}

export default AuthService;