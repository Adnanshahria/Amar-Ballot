import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, MapPin, Newspaper, Shield, Vote, UserCheck, Clock, CheckCircle, ArrowRight } from 'lucide-react';

import { checkUserVoteStatus } from '../lib/api';
import { useState } from 'react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        if (user) {
            checkUserVoteStatus(user.id).then(res => {
                if (res.success) setHasVoted(res.hasVoted);
            });
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const userName = (user as any)?.name || 'Adnan Shahria';
    const currentTime = new Date();
    const hour = currentTime.getHours();

    let greeting = 'Good Morning';
    if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
    else if (hour >= 17) greeting = 'Good Evening';

    // Verify Redirect
    useEffect(() => {
        if (user && (user as any).verification_status !== 'verified') {
            navigate('/verify-nid');
        }
    }, [user, navigate]);

    // Countdown Logic
    const electionDate = new Date('2026-02-12T08:00:00');
    const timeLeft = electionDate.getTime() - currentTime.getTime();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 mb-20 md:mb-0">
            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">

                {/* Header Section */}
                <div className="flex flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-sm sm:text-base text-green-600 font-medium mb-0.5">{greeting},</p>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-green-900 font-bold truncate max-w-[200px] sm:max-w-none">{userName}</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:bg-red-50 border border-red-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all flex items-center gap-2 font-medium text-xs sm:text-sm"
                    >
                        <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Sign Out</span>
                        <span className="sm:hidden">Exit</span>
                    </button>
                </div>

                {/* Hero Section: Digital ID & Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                    {/* Left: Digital Voter ID */}
                    <div className="lg:col-span-2">
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-1 shadow-xl text-white h-full">
                            {/* Card Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 h-full border border-white/20 flex flex-col sm:flex-row gap-4 sm:gap-6 relative z-10">
                                {/* Photo Area */}
                                <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-200 rounded-lg border-4 border-white/30 shadow-inner flex items-center justify-center overflow-hidden">
                                        <div className="text-center">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                <span className="text-2xl sm:text-4xl">👤</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-center w-full">
                                        <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-green-500/80 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider border border-white/20">
                                            Active Voter
                                        </span>
                                    </div>
                                </div>

                                {/* Details Area */}
                                <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
                                    <div className="flex justify-between items-start">
                                        <div className="w-full sm:w-auto">
                                            <h3 className="text-green-100 text-[10px] sm:text-xs uppercase tracking-widest mb-0.5">National Identity Card</h3>
                                            <h2 className="text-xl sm:text-2xl font-bold font-serif">{userName}</h2>
                                        </div>
                                        <img src="/logo.png" alt="BD" className="w-6 h-6 sm:w-8 sm:h-8 opacity-80 hidden sm:block" onError={(e) => e.currentTarget.style.display = 'none'} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm bg-black/10 sm:bg-transparent rounded-lg p-3 sm:p-0">
                                        <div className="flex justify-between sm:block border-b sm:border-0 border-white/10 pb-1 sm:pb-0">
                                            <p className="text-green-200 text-xs sm:mb-0.5">NID Number</p>
                                            <p className="font-mono text-base sm:text-lg font-medium tracking-wide">{(user as any)?.nid_number || '1993 2847 3290'}</p>
                                        </div>
                                        <div className="flex justify-between sm:block border-b sm:border-0 border-white/10 pb-1 sm:pb-0">
                                            <p className="text-green-200 text-xs sm:mb-0.5">Date of Birth</p>
                                            <p className="font-medium">{(user as any)?.date_of_birth || '12 Oct 1995'}</p>
                                        </div>
                                        <div className="flex justify-between sm:block border-b sm:border-0 border-white/10 pb-1 sm:pb-0">
                                            <p className="text-green-200 text-xs sm:mb-0.5">District</p>
                                            <p className="font-medium">{(user as any)?.district || 'Dhaka'}</p>
                                        </div>
                                        <div className="flex justify-between sm:block">
                                            <p className="text-green-200 text-xs sm:mb-0.5">Voter Area</p>
                                            <p className="font-medium">{(user as any)?.voter_area || 'Dhanmondi'}</p>
                                        </div>
                                    </div>

                                    <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-center sm:justify-start gap-2 text-xs text-green-100">
                                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-300" />
                                        <span>Biometric Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Election Countdown & Status */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Countdown Card */}
                        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-green-100">
                            <h3 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 text-center sm:text-left">Next Election In</h3>
                            <div className="flex justify-between text-center max-w-[280px] mx-auto sm:max-w-none">
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-green-700">{days}</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500 uppercase mt-1">Days</div>
                                </div>
                                <div className="text-xl sm:text-2xl text-gray-300 font-light pt-1">:</div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-green-700">{hours}</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500 uppercase mt-1">Hours</div>
                                </div>
                                <div className="text-xl sm:text-2xl text-gray-300 font-light pt-1">:</div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-green-700">{minutes}</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500 uppercase mt-1">Mins</div>
                                </div>
                            </div>
                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 text-center">
                                <p className="text-xs sm:text-sm font-medium text-gray-800">Parliamentary General Election</p>
                                <p className="text-[10px] sm:text-xs text-gray-500">Scheduled for February 12, 2026</p>
                            </div>
                        </div>

                        {/* Status Mini Card */}
                        <div className="bg-green-50 rounded-2xl p-4 sm:p-5 border border-green-100 flex items-center gap-4">
                            <div className="bg-white p-2.5 sm:p-3 rounded-full shadow-sm">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600">Voting Eligibility</p>
                                <p className="text-sm sm:text-base text-green-700 font-bold">Passed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Section: Vote Now or View Results */}
                {!hasVoted ? (
                    <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01]" onClick={() => navigate('/vote-center')}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2 flex items-center justify-center md:justify-start gap-3">
                                    <Vote className="w-8 h-8 animate-pulse text-green-200" />
                                    আপনার ভোট প্রদান করুন
                                </h2>
                                <p className="text-green-100 text-sm md:text-base max-w-xl">
                                    ২০২৬ সালের জাতীয় নির্বাচনে আপনার মতামত জানান। আপনার ভোট অত্যন্ত গুরুত্বপূর্ণ।
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="bg-white text-green-800 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-green-50 transition-colors flex items-center gap-2">
                                    ভোট দিন
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01]" onClick={() => navigate('/candidate-list')}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2 flex items-center justify-center md:justify-start gap-3">
                                    <CheckCircle className="w-8 h-8 text-blue-200" />
                                    আপনার ভোট গ্রহণ করা হয়েছে
                                </h2>
                                <p className="text-blue-100 text-sm md:text-base max-w-xl">
                                    ধন্যবাদ! আপনি সফলভাবে আপনার ভোট প্রদান করেছেন। ফলাফল দেখতে নিচের বাটনে ক্লিক করুন।
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                                    ফলাফল দেখুন
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions Bento Grid */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

                        <button onClick={() => navigate('/vote-center')} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-blue-50 w-10 h-10 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-sm sm:text-base text-gray-800">Vote Center</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Locate your center</p>
                        </button>

                        <button onClick={() => navigate('/candidate-list')} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                                <UserCheck className="w-5 h-5 text-purple-600" />
                            </div>
                            <h4 className="font-bold text-sm sm:text-base text-gray-800">Candidates</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Know who to vote</p>
                        </button>

                        <button onClick={() => navigate('/video-tutorials')} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                                <Vote className="w-5 h-5 text-orange-600" />
                            </div>
                            <h4 className="font-bold text-sm sm:text-base text-gray-800">How to Vote</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Video tutorials</p>
                        </button>

                        <button onClick={() => navigate('/election-updates')} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                                <Newspaper className="w-5 h-5 text-red-600" />
                            </div>
                            <h4 className="font-bold text-sm sm:text-base text-gray-800">News</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Latest announcements</p>
                        </button>

                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden hidden sm:block">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-800">Recent Activity</h3>
                        <button className="text-sm text-green-600 hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <div className="px-6 py-4 flex gap-4 hover:bg-green-50/30 transition-colors">
                            <div className="mt-1"><Clock className="w-4 h-4 text-gray-400" /></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Voter Slip Generated</p>
                                <p className="text-xs text-gray-500 mt-0.5">Your official voter slip is ready to download.</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">2 hrs ago</span>
                        </div>
                        <div className="px-6 py-4 flex gap-4 hover:bg-green-50/30 transition-colors">
                            <div className="mt-1"><Clock className="w-4 h-4 text-gray-400" /></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Profile Updated</p>
                                <p className="text-xs text-gray-500 mt-0.5">You successfully updated your contact address.</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">1 day ago</span>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
