import { ScrollText, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ElectionRules() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Election Code of Conduct</h1>

                <div className="grid gap-6">
                    {/* Section 1 */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border-l-4 border-green-600">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                            <h2 className="text-xl font-bold text-gray-800">For Voters</h2>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Maintain peace and order at the polling station.</li>
                            <li>Do not carry mobile phones inside the voting booth.</li>
                            <li>Respect the privacy of other voters.</li>
                            <li>Follow instructions from election officials.</li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border-l-4 border-amber-500">
                        <div className="flex items-center gap-3 mb-4">
                            <ScrollText className="w-6 h-6 text-amber-500" />
                            <h2 className="text-xl font-bold text-gray-800">For Candidates</h2>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Campaigning must stop 48 hours before voting begins.</li>
                            <li>No hate speech or incitement to violence.</li>
                            <li>Wall writing and excessive noise pollution are prohibited.</li>
                            <li>Bribery or intimidation of voters is a criminal offense.</li>
                        </ul>
                    </div>

                    {/* Warning */}
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-200 flex items-start gap-4">
                        <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold text-red-800 mb-1">Penalties for Violations</h3>
                            <p className="text-red-700 text-sm">
                                Violating election laws can result in fines, imprisonment, or disqualification. Please report any suspicious activity immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
