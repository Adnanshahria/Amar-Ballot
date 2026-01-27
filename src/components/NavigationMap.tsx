import { useState } from 'react';
import { ChevronUp, ChevronDown, Map as MapIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavigationMap() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Election Updates', path: '/election-updates' },
        { label: 'Your Vote Center', path: '/vote-center' },
        { label: 'Course', path: '/course' },
        { label: 'Compare Candidates', path: '/compare' },
        { label: 'Rumor Check', path: '/rumor-check' },
        { label: 'Video Tutorials', path: '/video-tutorials' },
        { label: 'Get a Civic Hero Badge', path: '/civic-badge' },
    ];
    // Hide on mobile when on chat page
    const isOnChatPage = location.pathname === '/chat';

    return (
        <div className={`fixed bottom-8 right-8 z-50 flex flex-col items-end ${isOnChatPage ? 'hidden md:flex' : ''}`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-180' : 'bg-green-500 hover:bg-green-600'
                    }`}
            >
                {isOpen ? (
                    <ChevronDown className="w-8 h-8 text-white" />
                ) : (
                    <ChevronUp className="w-8 h-8 text-white" />
                )}
            </button>

            {/* Menu Popup */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 origin-bottom-right">

                    {/* Header */}
                    <div className="bg-green-50 px-5 py-4 flex items-center gap-3 border-b border-green-100">
                        <MapIcon className="w-6 h-6 text-green-600" />
                        <h3 className="text-xl font-bold text-green-700 font-serif">Navigation Map</h3>
                    </div>

                    {/* Scrollable List */}
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (item.path !== '#') {
                                            navigate(item.path);
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-colors ${isActive
                                        ? 'bg-green-500 text-white font-medium shadow-md'
                                        : 'text-slate-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                    {/* Scroll Indicator (Visual Only) */}
                    <div className="absolute right-1 top-16 bottom-2 w-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-full h-1/3 bg-gray-400 rounded-full mt-8"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
