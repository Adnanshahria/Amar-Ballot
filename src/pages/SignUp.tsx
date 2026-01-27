
export default function SignUp() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-center min-h-[80vh]">

            <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10">

                {/* Title */}
                <h1 className="text-4xl text-green-900 font-serif font-medium text-center mb-4">
                    Sign Up
                </h1>

                {/* Division Selector Button - Matching CandidateList style */}
                <button className="bg-green-700 hover:bg-green-800 text-white font-serif text-xl px-2 py-3 rounded-md shadow-lg w-full transition-colors relative">
                    Select Your Division
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/20 to-transparent rounded-b-md"></div>
                </button>

                {/* Form Fields */}
                <div className="w-full space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg rounded-t-md"
                    />
                    <input
                        type="text"
                        placeholder="DD/MM/YY"
                        className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg"
                    />
                    <input
                        type="text"
                        placeholder="NID Number"
                        className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg"
                    />
                    <input
                        type="text"
                        placeholder="Refer Code (If any)"
                        className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg rounded-b-md"
                    />
                </div>

                {/* CTA Button */}
                <button className="w-full bg-green-800 hover:bg-green-900 text-white font-serif text-xl py-3 rounded-full shadow-lg transition-transform active:scale-95 mt-4 border border-green-700">
                    Click to continue
                </button>

            </div>

            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>

        </main>
    );
}
