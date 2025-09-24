import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types';
import AuthService from '../services/authService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing authentication on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = AuthService.getStoredUser();
      const storedToken = AuthService.getStoredToken();

      if (storedUser && storedToken) {
        // Verify token with backend
        const result = await AuthService.verifyToken();
        if (result.success && result.data) {
          setAuthState({
            user: result.data,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          // Token invalid, clear storage
          await AuthService.logout();
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    const result = await AuthService.login(credentials);
    
    if (result.success && result.data) {
      setAuthState({
        user: result.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: result.error || 'Login failed',
      }));
      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    const result = await AuthService.register(credentials);
    
    if (result.success && result.data) {
      setAuthState({
        user: result.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: result.error || 'Registration failed',
      }));
      return false;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    await AuthService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;