import { MapPin } from 'lucide-react';
import AssistantAvatar from '../components/AssistantAvatar';

export default function VoteCenter() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-center min-h-[80vh]">

            {/* Main Card Container */}
            <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-sm border-2 border-green-600 rounded-lg p-8 shadow-xl overflow-hidden">

                {/* Background Image inside card - Faded */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>

                <div className="relative z-10 flex flex-col items-center gap-8">

                    {/* Title */}
                    <h1 className="text-4xl text-green-900 font-serif font-medium text-center">
                        Find Your Vote Center
                    </h1>

                    {/* Form Section */}
                    <div className="w-full max-w-md space-y-4">
                        {/* Date Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="DD/MM/YY"
                                className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg"
                            />
                        </div>

                        {/* NID Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="NID Number"
                                className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg"
                            />
                        </div>

                        {/* CTA Button */}
                        <button className="w-full bg-green-800 hover:bg-green-900 text-white font-serif text-xl py-3 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4">
                            Click to continue
                        </button>
                    </div>

                    {/* Bottom Section */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-8">

                        {/* Left: Assistant */}
                        <div className="flex justify-center md:justify-start">
                            <div className="transform scale-75 origin-left">
                                <AssistantAvatar />
                            </div>
                        </div>

                        {/* Center: Result Placeholders */}
                        <div className="flex flex-col gap-3 w-full">
                            <div className="h-10 w-full bg-white border-2 border-green-600 rounded-full shadow-inner"></div>
                            <div className="h-10 w-full bg-white border-2 border-green-600 rounded-full shadow-inner"></div>
                            <div className="h-12 w-full bg-green-700 rounded-md shadow-md mt-2"></div>
                        </div>

                        {/* Right: Map Link */}
                        <div className="flex items-center justify-center md:justify-end gap-2 text-green-800 font-bold cursor-pointer hover:underline">
                            <MapPin className="w-8 h-8 text-red-600" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-lg">View on</span>
                                <span className="text-xl">Google Map</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Decorative Google Map bottom strip */}
            <div className="w-full max-w-4xl h-12 mt-4 bg-yellow-50 border border-gray-200 rounded overflow-hidden opacity-80">
                {/* Visual placeholder for map strip shown in design */}
                <div className="w-full h-full bg-[url('https://assets.gcore.pro/blog_containerizing_prod/uploads/2023/09/google-maps-platform-matrix-1-1.png')] bg-cover bg-center opacity-50"></div>
            </div>

        </main>
    );
}
