"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Send,
  MessageCircle,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AIAssistantChatProps {
  balanceData?: any;
  isLoading?: boolean;
  error?: string | null;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIAssistantChat({
  balanceData,
  isLoading,
  error,
}: AIAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI financial assistant. I can help you with budgeting, saving tips, spending analysis, and financial planning. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "How can I save more money?",
    "What's my spending pattern?",
    "Help me create a budget",
    "Investment advice",
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const responses = {
      save: "Based on your spending patterns, I recommend setting up automatic transfers to your savings account. Consider the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings.",
      spending:
        "Your top spending categories are Food (25%), Shopping (20%), and Transportation (15%). Consider reducing dining out expenses to save more.",
      budget:
        "I'll help you create a personalized budget. Let's start with your monthly income and essential expenses. Would you like me to analyze your current spending?",
      investment:
        "For your financial goals, I recommend starting with a diversified portfolio. Consider low-cost index funds and emergency fund first.",
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("save")) return responses.save;
    if (lowerQuestion.includes("spending")) return responses.spending;
    if (lowerQuestion.includes("budget")) return responses.budget;
    if (lowerQuestion.includes("investment")) return responses.investment;

    return "I understand your question. Let me analyze your financial data to provide personalized advice. Could you be more specific about what you'd like to know?";
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  if (isLoading) {
    return (
      <Card className='animate-pulse'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/3'></div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='h-64 bg-gray-200 rounded'></div>
            <div className='h-10 bg-gray-200 rounded'></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='text-center text-red-600'>
            <Bot className='h-8 w-8 mx-auto mb-2' />
            <p>Failed to load AI assistant</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='h-[600px] flex flex-col'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Bot className='h-5 w-5 text-blue-600' />
          AI Assistant
          <Badge
            variant='secondary'
            className='text-xs bg-blue-100 text-blue-700'
          >
            <Sparkles className='h-3 w-3' />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col space-y-4'>
        {/* Chat Messages */}
        <div className='flex-1 overflow-y-auto space-y-4 max-h-96'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "ai" && (
                <div className='w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>
                  <Bot className='h-4 w-4 text-blue-600' />
                </div>
              )}
              <div
                className={cn(
                  "max-w-xs p-3 rounded-lg",
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                )}
              >
                <p className='text-sm'>{message.text}</p>
                <p className='text-xs opacity-70 mt-1'>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.sender === "user" && (
                <div className='w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
                  <MessageCircle className='h-4 w-4 text-gray-600' />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className='flex gap-2 justify-start'>
              <div className='w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>
                <Bot className='h-4 w-4 text-blue-600' />
              </div>
              <div className='bg-gray-100 dark:bg-gray-800 p-3 rounded-lg'>
                <div className='flex space-x-1'>
                  <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className='space-y-2'>
          <p className='text-xs text-muted-foreground'>Quick questions:</p>
          <div className='flex flex-wrap gap-2'>
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant='outline'
                size='sm'
                onClick={() => handleQuickQuestion(question)}
                className='text-xs'
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className='flex gap-2'>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Ask me anything about your finances...'
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className='flex-1'
          />
          <Button onClick={handleSendMessage} size='sm'>
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
