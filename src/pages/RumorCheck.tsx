import { ShieldAlert, ShieldCheck, Search } from 'lucide-react';

export default function RumorCheck() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Rumor Check</h1>

                <div className="mb-8">
                    <div className="bg-white p-2 rounded-full shadow-lg border border-green-200 flex items-center">
                        <Search className="w-6 h-6 text-gray-400 ml-3" />
                        <input
                            type="text"
                            placeholder="Search a rumor topic..."
                            className="flex-1 px-4 py-2 outline-none text-gray-700 bg-transparent"
                        />
                        <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700">Check</button>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* False Claim */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldAlert className="w-6 h-6 text-red-600" />
                            <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase">False</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Claim: Voting requires a smartphone.</h2>
                        <p className="text-gray-700 border-l-4 border-green-500 pl-4 italic">
                            Fact: This is incorrect. Voting is done via paper ballot or EVM at the polling station. No personal phone is needed.
                        </p>
                    </div>

                    {/* True Claim */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">True</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Claim: Polls close at 4:00 PM.</h2>
                        <p className="text-gray-700 border-l-4 border-green-500 pl-4 italic">
                            Fact: Yes, official polling hours are from 8:00 AM to 4:00 PM uninterrupted.
                        </p>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
