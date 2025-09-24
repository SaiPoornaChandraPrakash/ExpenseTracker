import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import ChatService from '../../services/chatService';

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  background: white;
  border-top: 1px solid #e9ecef;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled(Button)`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  min-width: 45px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 15px 15px;
  background: white;
`;

const SuggestionButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 15px;
  padding: 6px 12px;
  font-size: 12px;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }
`;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  className 
}) => {
  const [message, setMessage] = useState('');
  const [suggestions] = useState(ChatService.getExpenseSuggestions());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!disabled) {
      onSendMessage(suggestion);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className={className}>
      <SuggestionsContainer>
        {suggestions.map((suggestion, index) => (
          <SuggestionButton
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={disabled}
          >
            {suggestion}
          </SuggestionButton>
        ))}
      </SuggestionsContainer>
      
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <MessageInput
            type="text"
            placeholder={disabled ? "Processing..." : "Ask about your expenses..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
          <SendButton
            type="submit"
            disabled={!message.trim() || disabled}
            size="medium"
            variant="primary"
          >
            🚀
          </SendButton>
        </InputContainer>
      </form>
    </div>
  );
};

export default ChatInput;