
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  tools?: string[];
}

interface AgentChatProps {
  variant?: 'withTools' | 'compact';
}

export function AgentChat({ variant = 'withTools' }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: "Hi! I'm your AI CFO. I can help you find hidden fees, optimize subscriptions, and negotiate better rates. What would you like me to analyze today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: getAgentResponse(inputValue),
        timestamp: new Date(),
        tools: variant === 'withTools' ? ['fee-scan', 'bill-negotiate'] : undefined,
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getAgentResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('fee') || lowerInput.includes('charge')) {
      return "I'll scan your recent transactions for any unexpected fees. Based on your account history, I found 3 potential issues: a $35 overdraft fee from last week, a $2.50 ATM fee, and a $15 maintenance fee that might be waivable. Would you like me to dispute these?";
    }
    
    if (lowerInput.includes('subscription') || lowerInput.includes('netflix') || lowerInput.includes('spotify')) {
      return "Let me analyze your subscriptions. I found 8 active subscriptions totaling $127/month. I notice you have both Netflix and Hulu - we could save $8/month by canceling one. Also, your Spotify family plan isn't being used by other members. Want me to optimize these?";
    }
    
    if (lowerInput.includes('bill') || lowerInput.includes('negotiate') || lowerInput.includes('internet')) {
      return "I can help negotiate your bills! I see your internet bill is $89/month with Comcast. Based on current promotions and your usage, I can likely get you a better rate. Your phone bill with Verizon also looks high at $95/month. Shall I start negotiations?";
    }
    
    return "I understand you're looking to optimize your finances. I can help with fee discovery, subscription management, and bill negotiations. Try asking me about specific areas like 'scan for fees' or 'review my subscriptions'.";
  };

  return (
    <div className={`flex flex-col h-96 ${variant === 'compact' ? 'h-64' : ''}`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-md p-md bg-surface rounded-lg mb-md">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-accent text-bg'
                  : 'bg-border text-text'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.tools && (
                <div className="mt-2 space-y-1">
                  {message.tools.includes('fee-scan') && (
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      🔍 Scan for Fees
                    </Button>
                  )}
                  {message.tools.includes('bill-negotiate') && (
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      📞 Negotiate Bills
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-border text-text px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me about fees, subscriptions, or bills..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <Button 
          variant="primary" 
          onClick={handleSend} 
          disabled={!inputValue.trim() || isLoading}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
