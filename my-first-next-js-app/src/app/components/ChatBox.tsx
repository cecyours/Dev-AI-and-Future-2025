"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
}

const dummyMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your AI assistant. How can I help you with development and AI today?",
    sender: "ai",
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: 2,
    text: "Hi! I'm working on a React project and need help with state management.",
    sender: "user",
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: 3,
    text: "Great! For React state management, you have several options. For simple state, useState is perfect. For complex state, consider useReducer or Context API. For global state, Redux Toolkit or Zustand are excellent choices. What's the complexity of your project?",
    sender: "ai",
    timestamp: new Date(Date.now() - 180000)
  },
  {
    id: 4,
    text: "It's a medium-sized app with multiple components that need to share data.",
    sender: "user",
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: 5,
    text: "Perfect! For medium-sized apps, I'd recommend React Context API with useReducer. It's built into React, has no external dependencies, and provides excellent performance. Would you like me to show you a practical example?",
    sender: "ai",
    timestamp: new Date(Date.now() - 60000)
  }
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Animate messages on mount
    const messageElements = chatContainerRef.current?.querySelectorAll('.message-item');
    if (messageElements) {
      gsap.fromTo(messageElements,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Animate chat box when opening/closing
    if (chatBoxRef.current) {
      if (isOpen) {
        gsap.fromTo(chatBoxRef.current,
          { scale: 0.8, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(chatBoxRef.current, {
          scale: 0.8,
          opacity: 0,
          y: 50,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:8000/chat', {
        message: currentInput
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
      });

      const aiMessage: Message = {
        id: messages.length + 2,
        text: response.data.response || response.data.message || "I received your message!",
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Fallback to dummy response if API fails
      const aiMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting to my server right now. Please try again later.",
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateDetailedResponse = () => {
    const responses = [
      "First, make sure you have the right dependencies installed. Then, create a context provider that wraps your app. Use useReducer for complex state logic, and useContext in your components to access the state. This approach gives you clean, predictable state management without external libraries.",
      "Consider using a custom hook to encapsulate your logic. This makes your components cleaner and your code more reusable. You can also combine this with TypeScript for better type safety and developer experience.",
      "For performance optimization, use React.memo for components that don't need frequent re-renders, and useCallback for functions passed as props. This will help prevent unnecessary re-renders and improve your app's performance.",
      "The key is to keep your state as close to where it's used as possible. Only lift state up when multiple components need access to the same data. This follows React's principle of colocation and makes your code easier to maintain.",
      "Remember to handle loading states and errors gracefully. Use try-catch blocks for async operations, and provide meaningful feedback to users when things go wrong. This improves the overall user experience."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-circle btn-primary shadow-lg mb-2 w-14 h-14"
        >
          <span className="text-xl">💬</span>
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div ref={chatBoxRef} className="card w-96 bg-base-100 shadow-xl border border-base-300">
          {/* Chat Header */}
          <div className="card-body p-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm opacity-90">Ready to help with Dev & AI</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="badge badge-success badge-sm">Online</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 space-y-4 bg-base-50"
            >
              {messages.map((message) => (
                <div key={message.id} className="message-item">
                  <div className={`chat ${message.sender === "user" ? "chat-end" : "chat-start"}`}>
                    {message.sender === "ai" && (
                      <div className="chat-image avatar">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-sm">🤖</span>
                        </div>
                      </div>
                    )}
                    <div className={`chat-bubble ${
                      message.sender === "user" 
                        ? "chat-bubble-primary" 
                        : "chat-bubble-secondary"
                    }`}>
                      {message.text}
                    </div>
                    <div className="chat-footer opacity-50 text-xs">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="message-item">
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-sm">🤖</span>
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-secondary">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-current rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-current rounded-full typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-base-100 border-t border-base-300">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <textarea
                    className="textarea textarea-bordered w-full resize-none"
                    placeholder="Ask me about development, AI, or anything tech-related..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={1}
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  className="btn btn-primary btn-circle"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {["React Tips", "AI Tools", "Code Review", "Best Practices"].map((action) => (
                  <button
                    key={action}
                    className="btn btn-xs btn-outline hover:btn-primary"
                    onClick={() => {
                      setInputValue(action);
                      // Auto-send after a short delay
                      setTimeout(() => {
                        if (inputValue === action) {
                          handleSendMessage();
                        }
                      }, 500);
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
              
              {/* Chat Stats */}
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>{messages.length} messages</span>
                <span>AI Assistant v1.0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}