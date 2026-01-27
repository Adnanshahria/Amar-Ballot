import { Bell, Newspaper, Calendar } from 'lucide-react';

export default function ElectionUpdates() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Election Updates</h1>

                <div className="space-y-6">
                    {/* Latest Alert */}
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm flex items-start gap-4">
                        <Bell className="w-8 h-8 text-red-600 flex-shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Voting Schedule Announced</h2>
                            <p className="text-sm text-gray-600 mb-2">January 25, 2026</p>
                            <p className="text-gray-700">The Election Commission has officially announced that the 13th National Parliamentary Election will be held on December 30, 2026. Polls will be open from 8:00 AM to 4:00 PM.</p>
                        </div>
                    </div>

                    {/* News Item 1 */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <Newspaper className="w-8 h-8 text-green-600 flex-shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">New Voter List Published</h2>
                            <p className="text-sm text-gray-600 mb-2">January 20, 2026</p>
                            <p className="text-gray-700">The updated voter list for all constituencies is now available. Check your registration status online or at your local election office.</p>
                        </div>
                    </div>

                    {/* News Item 2 */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <Calendar className="w-8 h-8 text-green-600 flex-shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Candidate Nomination Deadline</h2>
                            <p className="text-sm text-gray-600 mb-2">January 15, 2026</p>
                            <p className="text-gray-700">Candidates must submit their nomination papers by February 15, 2026. Scrutiny of nominations will take place on February 20.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
