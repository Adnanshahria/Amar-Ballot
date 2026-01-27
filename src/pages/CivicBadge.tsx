import { Medal, Star, Share2 } from 'lucide-react';

export default function CivicBadge() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-2xl relative z-10 text-center">
                <h1 className="text-4xl text-green-900 font-serif font-bold mb-4">Civic Hero Badge</h1>
                <p className="text-gray-600 mb-8">Complete the pledge to become a certified Civic Hero!</p>

                <div className="bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-green-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>

                    <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Medal className="w-20 h-20 text-yellow-500 drop-shadow-md" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">I Pledge to Vote</h2>
                    <p className="text-gray-600 italic mb-6">"I promise to be a responsible citizen, respect the democratic process, and cast my vote for the betterment of my country."</p>

                    <form className="space-y-4 max-w-xs mx-auto mb-8">
                        <input type="text" placeholder="Enter Your Name" className="w-full text-center border-b-2 border-gray-300 focus:border-green-500 outline-none py-2 bg-transparent font-serif text-lg" />
                    </form>

                    <button className="w-full bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-transform">
                        <Star className="w-5 h-5 fill-current" />
                        Claim My Badge
                    </button>

                    <div className="mt-4 flex justify-center">
                        <button className="text-gray-500 hover:text-green-600 flex items-center gap-1 text-sm">
                            <Share2 className="w-4 h-4" /> Share on Facebook
                        </button>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
