import { BookOpen, PlayCircle, Award } from 'lucide-react';

export default function Course() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-5xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Civic Education Course</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Course Card 1 */}
                    <div className="bg-white/90 rounded-2xl shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                        <div className="h-40 bg-green-100 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-green-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Democracy 101</h2>
                            <p className="text-gray-600 text-sm mb-4">Understand the foundations of democracy and why your vote matters.</p>
                            <div className="flex items-center justify-between text-green-700 text-xs font-bold uppercase tracking-wider">
                                <span>3 Modules</span>
                                <span>30 Mins</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Card 2 */}
                    <div className="bg-white/90 rounded-2xl shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                        <div className="h-40 bg-green-100 flex items-center justify-center">
                            <PlayCircle className="w-16 h-16 text-green-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">The Voting Process</h2>
                            <p className="text-gray-600 text-sm mb-4">A visual guide to what happens inside the polling booth.</p>
                            <div className="flex items-center justify-between text-green-700 text-xs font-bold uppercase tracking-wider">
                                <span>1 Video</span>
                                <span>15 Mins</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Card 3 */}
                    <div className="bg-white/90 rounded-2xl shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                        <div className="h-40 bg-green-100 flex items-center justify-center">
                            <Award className="w-16 h-16 text-green-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Election Laws</h2>
                            <p className="text-gray-600 text-sm mb-4">Know your rights and responsibilities as a citizen.</p>
                            <div className="flex items-center justify-between text-green-700 text-xs font-bold uppercase tracking-wider">
                                <span>5 Modules</span>
                                <span>45 Mins</span>
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
