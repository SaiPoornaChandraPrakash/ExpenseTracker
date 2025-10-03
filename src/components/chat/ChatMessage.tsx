import React from 'react';
import styled from 'styled-components';
import { ChatMessage as ChatMessageType } from '../../types';

const MessageContainer = styled.div<{ sender: 'user' | 'assistant' }>`
  display: flex;
  margin: 15px 0;
  justify-content: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div<{ sender: 'user' | 'assistant' }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  
  ${props => props.sender === 'user' ? `
    background-color: #007bff;
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    background-color: #f1f3f5;
    color: #333;
    border-bottom-left-radius: 4px;
  `}
`;

const MessageContent = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`;

const MessageTime = styled.span`
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  display: block;
`;

const AvatarContainer = styled.div<{ sender: 'user' | 'assistant' }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: ${props => props.sender === 'user' ? '0 0 0 10px' : '0 10px 0 0'};
  
  ${props => props.sender === 'user' ? `
    background-color: #007bff;
    color: white;
  ` : `
    background-color: #28a745;
    color: white;
  `}
`;

interface ChatMessageProps {
  message: ChatMessageType;
  className?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, className }) => {
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <MessageContainer sender={message.sender} className={className}>
      {message.sender === 'assistant' && (
        <AvatarContainer sender={message.sender}>
          🤖
        </AvatarContainer>
      )}
      
      <MessageBubble sender={message.sender}>
        <MessageContent>{message.content}</MessageContent>
        <MessageTime>{formatTime(message.timestamp)}</MessageTime>
      </MessageBubble>
      
      {message.sender === 'user' && (
        <AvatarContainer sender={message.sender}>
          👤
        </AvatarContainer>
      )}
    </MessageContainer>
  );
};

export default ChatMessage;