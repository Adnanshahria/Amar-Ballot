import { useState, useEffect } from 'react';
import { Share2, Copy, CheckCircle2, ChevronRight, AlertCircle, BookOpen, Users, Award, HelpCircle, FileText, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

// --- Types & Data ---

type ModuleType = 'dashboard' | 'rights' | 'responsibilities' | 'nid' | 'rules';

const VOTER_RIGHTS = [
    { title: "Right to Vote Freely", desc: "No one can force you to vote a certain way. You make your own choice.", icon: <Award className="w-6 h-6 text-blue-600" /> },
    { title: "Right to Secrecy", desc: "Your vote is private. No one should know who you voted for.", icon: <Shield className="w-6 h-6 text-green-600" /> },
    { title: "Right to Information", desc: "You have the right to know about candidates and election issues.", icon: <BookOpen className="w-6 h-6 text-purple-600" /> },
    { title: "Accessibility (PWD)", desc: "Polling stations must provide support for persons with disabilities.", icon: <Users className="w-6 h-6 text-orange-600" /> }
];

const RESPONSIBILITIES = [
    { title: "Verify Registration", desc: "Ensure you are registered and eligible to vote." },
    { title: "Follow the Law", desc: "Comply with all election rules and conduct." },
    { title: "Avoid Influence", desc: "Vote based on your own views, not external pressure." },
    { title: "Respect Privacy", desc: "Do not ask others who they voted for." }
];

const NID_STEPS = [
    { step: 1, title: "Online Pre-Registration", desc: "Visit NID website, fill form, submit documents." },
    { step: 2, title: "Visit Election Office", desc: "Go to designated center with application copy." },
    { step: 3, title: "Biometric Collection", desc: "Provide fingerprints, photo, and signature." },
    { step: 4, title: "Verification", desc: "Authorities verify your data and documents." },
    { step: 5, title: "Receive NID", desc: "Collect your Smart NID card or download copy." }
];

const RULES = [
    { rule: "Be Eligible", desc: "Must be a citizen and 18+ years old." },
    { rule: "One Person, One Vote", desc: "Voting more than once is a crime." },
    { rule: "No Campaigning", desc: "No political activity inside polling centers." },
    { rule: "Bring ID", desc: "Carry your NID or voter slip." }
];

export default function CivicBadge() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<ModuleType>('dashboard');
    const [referralCode] = useState('05012003'); // Mock code or user ID
    const [referralCount, setReferralCount] = useState(3); // Mock count
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Quiz State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questions = [
        {
            question: "Which of the following is a citizen's duty?",
            options: ["Pay Taxes", "Ignore Election", "Spread Misinformation", "Avoid Service"],
            correct: 0
        }
    ];

    const handleQuizOption = (index: number) => {
        if (index === questions[currentQuestion].correct) {
            setQuizAnswered(true);
            setShowConfetti(true);
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            alert("Try again! Think about what helps the nation.");
        }
    };

    const copyReferral = () => {
        navigator.clipboard.writeText(`https://amarballot.bd/ref/${referralCode}`);
        alert("Referral link copied!");
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 selection:bg-green-100 selection:text-green-900">
            <div className="max-w-6xl mx-auto">

                {/* Dashboard Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">
                            Welcome, {user?.name || 'Citizen'}!
                        </h1>
                        <p className="text-gray-500">Your hub for civic engagement, learning, and rewards.</p>

                        {/* Tab Navigation */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {[
                                { id: 'dashboard', label: 'Civic Hero', icon: <Award className="w-4 h-4" /> },
                                { id: 'rights', label: 'Voter Rights', icon: <Shield className="w-4 h-4" /> },
                                { id: 'responsibilities', label: 'Responsibilities', icon: <CheckCircle2 className="w-4 h-4" /> },
                                { id: 'nid', label: 'Get NID', icon: <FileText className="w-4 h-4" /> },
                                { id: 'rules', label: 'Voter Rules', icon: <AlertCircle className="w-4 h-4" /> },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as ModuleType)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all
                                        ${activeTab === tab.id
                                            ? 'bg-green-600 text-white shadow-md transform scale-105'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-green-300'
                                        }
                                    `}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left/Main Column (2/3 width) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* --- DASHBOARD VIEW --- */}
                        {activeTab === 'dashboard' && (
                            <>
                                {/* Referral Banner (Matches 13.png) */}
                                <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
                                    <div className="relative z-10 max-w-lg">
                                        <p className="text-green-100 font-medium mb-2 uppercase tracking-wider text-sm">Civic Hero Program</p>
                                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 leading-tight">
                                            Your Super Power is to Share Knowledge.
                                        </h2>
                                        <p className="text-green-50 text-lg mb-8 opacity-90">
                                            Enlighten others. Earn badges. Build a better democracy.
                                        </p>

                                        <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl flex items-center border border-white/20 max-w-md">
                                            <div className="bg-green-800/80 px-4 py-2 rounded-lg text-white font-mono font-bold tracking-wider">
                                                {referralCode}
                                            </div>
                                            <div className="flex-1 px-4 text-green-100 text-sm font-medium">
                                                Your Referral Code
                                            </div>
                                            <button
                                                onClick={copyReferral}
                                                className="bg-white text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-50 transition-colors flex items-center gap-2 text-sm"
                                            >
                                                <Copy className="w-4 h-4" /> Copy
                                            </button>
                                        </div>
                                    </div>
                                    {/* Decorative circles */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/4 translate-x-1/4"></div>
                                    <div className="absolute bottom-0 right-12 w-32 h-32 bg-yellow-400 opacity-20 rounded-full blur-2xl"></div>
                                </div>

                                {/* Referral Status (Matches Levels in 13.png) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: 'Civic Educator', req: '2+ Referrals', active: referralCount >= 2, color: 'bg-emerald-100 text-emerald-800' },
                                        { label: 'Responsible Voter', req: '5+ Referrals', active: referralCount >= 5, color: 'bg-blue-100 text-blue-800' },
                                        { label: 'Civic Super Hero', req: '10+ Referrals', active: referralCount >= 10, color: 'bg-amber-100 text-amber-800' },
                                    ].map((badge, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl border-2 transition-all ${badge.active ? `${badge.color} border-transparent` : 'bg-white border-gray-100 opacity-50'}`}>
                                            <div className="text-xs font-bold uppercase opacity-60 mb-1">{badge.req}</div>
                                            <div className="font-bold text-lg">{badge.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* --- VOTER RIGHTS (Matches 8.png) --- */}
                        {activeTab === 'rights' && (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 font-serif mb-6 flex items-center gap-2">
                                    <Award className="text-green-600" /> Voter Rights
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {VOTER_RIGHTS.map((right, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl hover:bg-green-50 transition-colors group border border-transparent hover:border-green-100">
                                            <div className="mb-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                {right.icon}
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 mb-2">{right.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{right.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- RESPONSIBILITIES (Matches 9.png) --- */}
                        {activeTab === 'responsibilities' && (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 font-serif mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="text-green-600" /> Voter Responsibilities
                                </h2>
                                <div className="space-y-4">
                                    {RESPONSIBILITIES.map((resp, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                            <div className="bg-orange-100 text-orange-600 font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{resp.title}</h3>
                                                <p className="text-sm text-gray-600">{resp.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- NID PROCESS (Matches 16.png) --- */}
                        {activeTab === 'nid' && (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 font-serif mb-6 flex items-center gap-2">
                                    <FileText className="text-green-600" /> How to Get a NID
                                </h2>
                                <div className="relative border-l-2 border-green-100 pl-8 ml-4 space-y-8">
                                    {NID_STEPS.map((step, idx) => (
                                        <div key={idx} className="relative">
                                            <div className="absolute -left-[41px] top-0 bg-white border-2 border-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900">{step.step}. {step.title}</h3>
                                            <p className="text-gray-500 mt-1">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <a href="https://services.nidw.gov.bd/" target="_blank" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                                        Visit NID Website <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* --- VOTER RULES (Matches 24.png) --- */}
                        {activeTab === 'rules' && (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 font-serif mb-6 flex items-center gap-2">
                                    <AlertCircle className="text-green-600" /> Rules for a Voter
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {RULES.map((rule, idx) => (
                                        <div key={idx} className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                            <div className="text-yellow-800 font-bold mb-1">{rule.rule}</div>
                                            <div className="text-yellow-700 text-sm">{rule.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">

                        {/* Interactive Quiz (Matches 21.png) */}
                        <div className="bg-white rounded-3xl p-6 shadow-custom border border-gray-100 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <HelpCircle className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-2 font-serif">Citizen's Duty?</h3>
                                <p className="text-gray-500 text-sm mb-6">Answer correctly to earn your daily badge.</p>

                                {quizAnswered ? (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-xl font-bold border border-green-200 animate-in zoom-in">
                                        Correct! You are a dutiful citizen.
                                        <Award className="w-8 h-8 mx-auto mt-2 text-yellow-500" />
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {questions[currentQuestion].options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleQuizOption(idx)}
                                                className="w-full bg-slate-50 hover:bg-green-600 hover:text-white text-gray-700 font-medium py-2.5 rounded-lg text-sm transition-all border border-slate-200"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full"></div>
                        </div>

                        {/* Quick Stats / Gamification Sidebar */}
                        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Award className="text-yellow-400" /> Your Impact
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                                    <span className="text-slate-400 text-sm">Badges Earned</span>
                                    <span className="font-bold text-xl">3</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                                    <span className="text-slate-400 text-sm">Referrals</span>
                                    <span className="font-bold text-xl">{referralCount}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                                    <span className="text-slate-400 text-sm">NID Verified</span>
                                    <span className="font-bold text-green-400">Yes</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-colors">
                                View Leaderboard
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
