import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToAI } from '../services/aiService';
import type { ChatMessage } from '../services/aiService';
import preronaImg from '../assets/prerona.png';

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: 'Hello! 👋 I am Prerona, your voting assistant. I can help you with finding your vote center, learning about candidates, voter registration, and election rules. How can I help you today?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: inputValue.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await sendMessageToAI(newMessages);
            setMessages([...newMessages, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = [
        'How do I find my vote center?',
        'How to get a NID?',
        'Who are the candidates?',
        'Am I eligible to vote?',
    ];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-4 relative flex flex-col items-center min-h-[80vh]">
            <div className="w-full max-w-3xl flex flex-col h-[calc(100vh-140px)] relative z-10">

                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-green-200">
                    <div className="relative">
                        <img
                            src={preronaImg}
                            alt="Prerona"
                            className="w-14 h-14 rounded-full border-2 border-green-500 object-cover bg-green-50"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-green-900">Chat with Prerona</h1>
                        <p className="text-sm text-green-700">Your AI Voting Assistant • Online</p>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin scrollbar-thumb-green-200">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-green-700" />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user'
                                    ? 'bg-green-600 text-white rounded-br-md'
                                    : 'bg-white border border-green-200 text-gray-800 rounded-bl-md shadow-sm'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5 text-green-700" />
                            </div>
                            <div className="bg-white border border-green-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                                <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions (only show if few messages) */}
                {messages.length <= 2 && (
                    <div className="pb-3 flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => setInputValue(action)}
                                className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div className="bg-white border border-green-200 rounded-2xl shadow-lg p-2 flex items-center gap-2">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Prerona anything about voting..."
                        className="flex-1 resize-none border-none outline-none px-3 py-2 text-gray-800 placeholder-gray-400 max-h-32 bg-transparent"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                        className={`p-3 rounded-xl transition-all ${inputValue.trim() && !isLoading
                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-2">
                    Powered by Gemma 2B • Prerona may make mistakes
                </p>

            </div>

            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
