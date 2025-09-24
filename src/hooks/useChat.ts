import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatState } from '../types';
import ChatService from '../services/chatService';

interface UseChatReturn extends ChatState {
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
  clearError: () => void;
}

export const useChat = (): UseChatReturn => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  // Load chat history on mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const result = await ChatService.getChatHistory();
        if (result.success && result.data) {
          setChatState(prev => ({
            ...prev,
            messages: result.data || [],
          }));
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || chatState.isLoading) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: message.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Simulate typing delay for better UX
      await ChatService.simulateTyping(1000);

      // Send message to LLM service
      const result = await ChatService.sendMessage(message);

      if (result.success && result.data) {
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, result.data!],
          isLoading: false,
        }));
      } else {
        setChatState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Failed to send message',
        }));
      }
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An unexpected error occurred',
      }));
      console.error('Error sending message:', error);
    }
  }, [chatState.isLoading]);

  const clearChat = useCallback(() => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setChatState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...chatState,
    sendMessage,
    clearChat,
    clearError,
  };
};

export default useChat;