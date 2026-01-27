const quickLinks = [
    { label: 'Election Updates', path: '#' },
    { label: 'Your Vote Center', path: '/vote-center' },
    { label: 'Course', path: '#' },
    { label: 'Compare Candidates', path: '#' },
    { label: 'Rumor Check', path: '#' },
    { label: 'Video Tutorials', path: '#' },
];

import { useNavigate } from 'react-router-dom';

export default function QuickLinks() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-2">
            {/* Ready to Vote Badge - Simple pill shape with shadow */}
            <div className="bg-white text-green-600 px-8 py-3 rounded-full text-center font-bold text-xl shadow-lg border border-gray-100 italic">
                Ready to vote!
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
                {quickLinks.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => link.path !== '#' && navigate(link.path)}
                        className="w-full bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-white px-6 py-3 rounded-full transition-all border border-gray-200 text-gray-600 font-medium text-center shadow-sm"
                    >
                        {link.label}
                    </button>
                ))}
            </div>

            {/* Civic Hero Badge - Darker */}
            <button className="bg-gradient-to-r from-slate-100 to-white hover:from-green-100 hover:to-white text-slate-800 px-6 py-3 rounded-full font-bold border border-slate-300 text-center shadow-md">
                Get a Civic Hero Badge
            </button>
        </div>
    );
}
