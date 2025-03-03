'use client';

import { useState } from 'react';
import ProductDisplay from './ProductDisplay';

type Product = {
  title: string;
  url: string;
  image: string;
  price: string;
};

type Message = {
  text?: string;
  isUser: boolean;
  quick_response?: {
    products: Product[];
    error?: string;
  };
  detailed_response?: {
    products: Product[];
    error?: string;
  };
};

const GiftIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="animate-gift-spin"
  >
    <path d="M20 12v10H4V12" />
    <path d="M2 7h20v5H2z" />
    <path d="M12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const AgentMessage = ({ message, isLoading }: { message: string; isLoading?: boolean }) => (
  <div className="flex items-start space-x-2 text-white bg-zinc-800 rounded-lg p-3">
    <div className="flex-shrink-0 mt-1">
      <GiftIcon />
    </div>
    <div className="flex-grow">
      <p className="text-sm">{message}</p>
      {isLoading && (
        <div className="mt-2 flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
    </div>
  </div>
);

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const messageText = inputText.trim();
    if (!messageText) return;

    try {
      setIsSending(true);
      setIsLoading(true);
      setInputText('');
      
      const userMessage: Message = {
        text: messageText,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);

      // Quick response
      const quickResponse = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageText,
          type: 'quick'
        })
      });

      if (!quickResponse.ok) {
        throw new Error(`HTTP error! status: ${quickResponse.status}`);
      }

      const quickResult = await quickResponse.json();
      console.log('Frontend received quick response:', quickResult);
      
      const quickMessage: Message = {
        text: '',
        isUser: false,
        quick_response: quickResult.quick_response
      };
      
      setMessages(prev => [...prev, quickMessage]);

      // Detailed response
      const detailedResponse = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageText,
          type: 'detailed'
        })
      });

      if (!detailedResponse.ok) {
        throw new Error(`HTTP error! status: ${detailedResponse.status}`);
      }

      const detailedResult = await detailedResponse.json();
      console.log('Frontend received detailed response:', detailedResult);
      
      const detailedMessage: Message = {
        text: '',
        isUser: false,
        detailed_response: detailedResult.detailed_response
      };
      
      setMessages(prev => [...prev, detailedMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        text: 'Es gab einen Fehler bei der Verarbeitung Ihrer Nachricht.',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSending(false), 1000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="overflow-hidden">
        <div className="p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`${msg.isUser ? 'flex justify-end' : 'flex justify-start'} ${i === messages.length - 1 ? 'animate-fade-in' : ''}`}>
              {msg.isUser ? (
                <div className="max-w-[80%] bg-zinc-700 text-white rounded-lg px-4 py-2">
                  <p className="text-sm">{msg.text}</p>
                </div>
              ) : (
                <div className="max-w-[80%] space-y-4">
                  {/* Quick Results */}
                  {msg.quick_response?.products && msg.quick_response.products.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-white text-sm font-medium">Alles klar! Ich habe folgende spontane Vorschläge zu ihren angegebenen Interessen:</h3>
                      <ProductDisplay products={msg.quick_response.products} />
                    </div>
                  )}
                  
                  {/* Detailed Results */}
                  {msg.detailed_response?.products && msg.detailed_response.products.length > 0 && (
                    <div className="space-y-2 mt-6">
                      <h3 className="text-white text-sm font-medium">Und hier sind weitere passende Vorschläge zu ihren Interessen:</h3>
                      <ProductDisplay products={msg.detailed_response.products} />
                    </div>
                  )}

                  {/* Error Messages */}
                  {(msg.quick_response?.error || msg.detailed_response?.error) && (
                    <div className="text-red-400 text-sm mt-2">
                      {msg.quick_response?.error && <p>{msg.quick_response.error}</p>}
                      {msg.detailed_response?.error && <p>{msg.detailed_response.error}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-center justify-center bg-zinc-800 rounded-lg p-4">
                <div className="flex-shrink-0 loading-gift">
                  <GiftIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black">
        <div className="max-w-2xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Beschreiben Sie das perfekte Geschenk..."
              className="flex-1 bg-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`send-button focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${isSending ? 'sending' : ''}`}
              aria-label="Nachricht senden"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 12v10H4V12" />
                <path d="M2 7h20v5H2z" />
                <path d="M12 22V7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 