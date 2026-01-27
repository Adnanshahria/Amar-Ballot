import { User, Phone, Mail, MapPin, Award, Calendar } from 'lucide-react';
import preronaImg from '../assets/prerona.png';

export default function CandidateDetails() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden relative z-10 border border-green-100">

                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-green-600 to-green-800 relative">
                    <div className="absolute -bottom-16 left-8">
                        <img
                            src={preronaImg}
                            alt="Candidate"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-green-100 object-cover"
                        />
                    </div>
                </div>

                <div className="pt-20 px-8 pb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-green-900">Nargis Akter</h1>
                            <p className="text-green-700 font-medium text-lg">Running for Member of Parliament</p>
                            <p className="text-gray-500">Dhaka-10 Constituency</p>
                        </div>
                        <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-200 text-center">
                            <span className="block text-xs uppercase tracking-wider text-green-600 font-bold">Symbol</span>
                            <span className="text-2xl">😺</span>
                            <span className="block text-sm font-medium text-green-800">Cat</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Biography */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-green-200 pb-2">Biography</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Nargis Akter is a dedicated community leader with over 15 years of experience in public service. She has worked tirelessly to improve education and healthcare in her constituency. Her vision is to create a sustainable and inclusive development model for all citizens.
                            </p>

                            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-green-200 pb-2 mt-6">Key Manifesto Points</h2>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Free healthcare for seniors</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Modernization of local schools</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Youth employment programs</span>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Info */}
                        <div className="space-y-6">
                            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                <h3 className="text-lg font-bold text-green-900 mb-4">Contact Information</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Phone className="w-5 h-5 text-green-600" />
                                        <span>+880 1712 345678</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Mail className="w-5 h-5 text-green-600" />
                                        <span>contact@nargisakter.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MapPin className="w-5 h-5 text-green-600" />
                                        <span>123, Green Road, Dhaka</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500 flex items-center gap-2"><Award className="w-4 h-4" /> Education</span>
                                        <span className="font-medium text-gray-800">Masters including Political Science</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Age</span>
                                        <span className="font-medium text-gray-800">45 Years</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 flex items-center gap-2"><User className="w-4 h-4" /> Profession</span>
                                        <span className="font-medium text-gray-800">Social Worker</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
