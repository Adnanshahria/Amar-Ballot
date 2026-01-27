import { Award, Share2, Download, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CivicBadge() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 animate-in zoom-in duration-500">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-20 rounded-full"></div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3176/3176294.png"
                            alt="Civic Badge"
                            className="w-48 h-48 md:w-64 md:h-64 relative z-10 drop-shadow-2xl mx-auto"
                        />
                        {/* Animated Stars */}
                        <Star className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 text-fill-yellow-400 animate-bounce delay-100" fill="currentColor" />
                        <Star className="absolute top-1/2 -left-8 w-6 h-6 text-yellow-400 text-fill-yellow-400 animate-pulse delay-700" fill="currentColor" />
                        <Star className="absolute bottom-4 -right-8 w-5 h-5 text-yellow-400 text-fill-yellow-400 animate-ping delay-300" fill="currentColor" />
                    </div>
                </div>

                <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full font-bold text-sm tracking-wide mb-6 border border-yellow-200 uppercase">
                    Level 1 Achieved
                </span>

                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800 mb-6 font-serif">
                    Civic Hero Badge
                </h1>

                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Congratulations! By engaging with the democratic process, you've earned the <strong>Civic Hero</strong> distinction. This badge represents your commitment to a better future.
                </p>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto mb-10">
                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Badge Holder</p>
                            <p className="font-bold text-gray-900 text-lg">{user?.name || 'Guest User'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Issue Date</p>
                            <p className="font-bold text-gray-900 text-lg">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500 italic">ID: 883-CIVIC-2026</p>
                        <Award className="w-6 h-6 text-yellow-500" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
                        <Download className="w-5 h-5" />
                        Download Badge
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95">
                        <Share2 className="w-5 h-5" />
                        Share Achievement
                    </button>
                </div>
            </div>
        </div>
    );
}
