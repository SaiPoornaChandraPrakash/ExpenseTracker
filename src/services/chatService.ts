import axios from 'axios';
import { ChatMessage, ApiResponse } from '../types';

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

export class ChatService {
  static async sendMessage(message: string): Promise<ApiResponse<ChatMessage>> {
    try {
      const response = await api.post('/chat/message', { message });
      return { success: true, data: response.data };
    } catch (error: any) {
      // For development, return mock response if API is not available
      if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
        return { success: true, data: this.getMockResponse(message) };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to send message' 
      };
    }
  }

  static async getChatHistory(): Promise<ApiResponse<ChatMessage[]>> {
    try {
      const response = await api.get('/chat/history');
      return { success: true, data: response.data };
    } catch (error: any) {
      // For development, return empty history if API is not available
      if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
        return { success: true, data: [] };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch chat history' 
      };
    }
  }

  // Mock LLM response for development
  private static getMockResponse(userMessage: string): ChatMessage {
    const responses = [
      "I can see your expense patterns. You're spending quite a bit on dining out this month. Would you like me to create a chart showing your food expenses over time?",
      "Based on your expense data, I notice transportation costs have increased by 20% compared to last month. This could be due to rising gas prices.",
      "Your monthly budget tracking looks good! You're staying within your limits for most categories. The entertainment category seems to be your flex spending area.",
      "I can help you analyze spending patterns and create custom expense charts. What specific aspect of your expenses would you like to explore?",
      "Your savings rate has improved this quarter! You're spending 15% less on discretionary items compared to the previous period.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: `msg-${Date.now()}`,
      content: randomResponse,
      sender: 'assistant',
      timestamp: new Date(),
    };
  }

  // Simulate typing delay for better UX
  static async simulateTyping(delay: number = 1500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Generate expense-related suggestions
  static getExpenseSuggestions(): string[] {
    return [
      "Show me my spending by category this month",
      "Create a chart of my transportation expenses",
      "How much did I spend on food last week?",
      "Compare my expenses from this month to last month",
      "What's my biggest expense category?",
      "Show me daily expense trends",
    ];
  }
}

export default ChatService;