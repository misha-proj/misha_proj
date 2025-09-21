import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Edit3 } from 'lucide-react';
import { Message } from '../types';
import { ArmenianLogo } from './ArmenianFlag';

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
  onRegenerate?: () => void;
  language: 'ru' | 'hy' | 'en';
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isLast,
  onRegenerate,
  language
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animate message appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (message.sender === 'ai' && isLast) {
      setIsAnimating(true);
      setDisplayText('');
      
      // Delay before starting to type
      setTimeout(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < message.text.length) {
            setDisplayText(message.text.substring(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
            setIsAnimating(false);
          }
        }, 30);
      }, 800);
    } else {
      setDisplayText(message.text);
    }
  }, [message.text, message.sender, isLast]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
  };

  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'} transform transition-all duration-700 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      {!isUser && (
        <div className={`mt-1 relative transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}>
          <ArmenianLogo size="sm" blur={isAnimating} />
          {isAnimating && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D90429]/20 via-[#003F91]/20 to-[#FF8F00]/20 animate-ping"></div>
          )}
        </div>
      )}
      
      <div className={`max-w-[75%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`px-6 py-4 rounded-3xl transition-all duration-500 backdrop-blur-sm ${
            isUser
              ? 'bg-gradient-to-r from-[#D90429] to-[#FF8F00] text-white shadow-lg'
              : 'bg-gray-800/90 text-white border border-gray-700/50 shadow-xl'
          }`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <div className={`whitespace-pre-wrap leading-relaxed relative ${
            isAnimating && !isUser ? 'typing-animation' : ''
          }`}>
            {displayText}
            {isAnimating && (
              <span className="inline-block w-0.5 h-5 bg-[#D90429] ml-1 animate-pulse rounded-full"></span>
            )}
          </div>
          
          {/* Animated underline for AI typing */}
          {isAnimating && !isUser && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D90429]/30 via-[#003F91]/30 to-[#FF8F00]/30 animate-pulse"></div>
          )}
        </div>
        
        <div className={`flex items-center gap-2 mt-3 transition-all duration-300 ${
          showActions || isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-xl bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg"
            title="Копировать"
          >
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
          
          {!isUser && (
            <button
              onClick={onRegenerate}
              className="p-2 rounded-xl bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg"
              title="Сгенерировать заново"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          )}
          
          {isUser && (
            <button
              className="p-2 rounded-xl bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-lg"
              title="Редактировать"
            >
              <Edit3 className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};