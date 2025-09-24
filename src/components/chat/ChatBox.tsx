import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useChat } from '../../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const ChatContainer = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChatTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

const StatusIndicator = styled.span<{ online?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.online ? '#28a745' : '#6c757d'};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  max-height: calc(500px - 120px);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

const EmptyStateText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #666;
  font-size: 12px;
  background: #f8f9fa;
`;

interface ChatBoxProps {
  className?: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ className }) => {
  const { messages, isLoading, error, sendMessage, clearError } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  return (
    <ChatContainer className={className}>
      <ChatHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🤖</span>
          <ChatTitle>AI Expense Assistant</ChatTitle>
        </div>
        <StatusIndicator online={true} />
      </ChatHeader>

      {error && (
        <div style={{ padding: '10px 20px 0' }}>
          <ErrorMessage message={error} onClose={clearError} />
        </div>
      )}

      <MessagesContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>💬</EmptyStateIcon>
            <EmptyStateText>
              Start a conversation with your AI expense assistant!
            </EmptyStateText>
            <EmptyStateText style={{ marginTop: '5px', fontSize: '12px' }}>
              Ask about your spending patterns, charts, or budgeting tips.
            </EmptyStateText>
          </EmptyState>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <TypingIndicator>
                <LoadingSpinner size="small" />
                <span style={{ marginLeft: '8px' }}>AI is thinking...</span>
              </TypingIndicator>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </MessagesContainer>

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </ChatContainer>
  );
};

export default ChatBox;