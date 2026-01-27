
export default function VideoTutorials() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center min-h-[80vh]">
            <div className="w-full max-w-6xl flex flex-col items-center gap-12 relative z-10 pt-10">

                {/* Main Floating Button 1 */}
                <div className="w-full max-w-md transform hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-center py-4 px-8 rounded-sm shadow-lg border-b-4 border-green-800 relative">
                        <span className="font-serif text-2xl font-bold">Video Tutorials</span>
                        {/* Shadow Effect */}
                        <div className="absolute top-full left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                    </div>
                </div>

                {/* Main Floating Button 2 */}
                <div className="w-full max-w-md transform hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-center py-4 px-8 rounded-sm shadow-lg border-b-4 border-green-800 relative">
                        <span className="font-serif text-2xl font-bold">How to get a NID</span>
                        <div className="absolute top-full left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                    </div>
                </div>

                {/* Split Row 1 */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 px-4 md:px-20">
                    <div className="transform hover:scale-105 transition-transform cursor-pointer flex justify-center">
                        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-center py-4 px-6 rounded-sm shadow-lg border-b-4 border-green-800 relative w-full max-w-sm">
                            <span className="font-serif text-xl font-bold leading-tight block">National Parliament<br />Election</span>
                            <div className="absolute top-full left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                        </div>
                    </div>

                    <div className="transform hover:scale-105 transition-transform cursor-pointer flex justify-center">
                        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-center py-4 px-6 rounded-sm shadow-lg border-b-4 border-green-800 relative w-full max-w-sm">
                            <span className="font-serif text-xl font-bold">Referendum Vote</span>
                            <div className="absolute top-full left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                        </div>
                    </div>
                </div>

                {/* Split Row 2 */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 px-4 md:px-20">
                    <div className="transform hover:scale-105 transition-transform cursor-pointer flex justify-center">
                        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-center py-3 px-6 rounded-sm shadow-lg border-b-4 border-green-800 relative w-full max-w-xs">
                            <span className="font-serif text-lg font-bold">Traditional Ballot Paper</span>
                            <div className="absolute top-full left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                        </div>
                    </div>

                    <div className="transform hover:scale-105 transition-transform cursor-pointer flex justify-center">
                        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-center py-3 px-6 rounded-sm shadow-lg border-b-4 border-green-800 relative w-full max-w-xs">
                            <span className="font-serif text-lg font-bold">Traditional Ballot Paper</span>
                            <div className="absolute top-full left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                        </div>
                    </div>
                </div>


            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
