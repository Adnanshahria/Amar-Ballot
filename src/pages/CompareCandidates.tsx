import { Check, X } from 'lucide-react';

export default function CompareCandidates() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-5xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Compare Candidates</h1>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white/90 rounded-2xl shadow-xl overflow-hidden border-collapse">
                        <thead>
                            <tr className="bg-green-700 text-white">
                                <th className="p-4 text-left font-serif text-lg">Feature / Policy</th>
                                <th className="p-4 text-center font-serif text-lg bg-green-800">Nargis Akter</th>
                                <th className="p-4 text-center font-serif text-lg">Rahim Mia</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100">
                            <tr className="hover:bg-green-50/50">
                                <td className="p-4 font-bold text-gray-800">Education Reform</td>
                                <td className="p-4 text-center text-gray-700">Focus on Digital Literacy</td>
                                <td className="p-4 text-center text-gray-700">Focus on Infrastructure</td>
                            </tr>
                            <tr className="hover:bg-green-50/50">
                                <td className="p-4 font-bold text-gray-800">Healthcare</td>
                                <td className="p-4 text-center text-gray-700">Free Clinic for Seniors</td>
                                <td className="p-4 text-center text-gray-700">New Hospital Wing</td>
                            </tr>
                            <tr className="hover:bg-green-50/50">
                                <td className="p-4 font-bold text-gray-800">Experience</td>
                                <td className="p-4 text-center text-gray-700">15 Years Social Work</td>
                                <td className="p-4 text-center text-gray-700">10 Years Business</td>
                            </tr>
                            <tr className="hover:bg-green-50/50">
                                <td className="p-4 font-bold text-gray-800">Clean Energy Pledge</td>
                                <td className="p-4 text-center flex justify-center"><Check className="text-green-600 w-6 h-6" /></td>
                                <td className="p-4 text-center flex justify-center"><X className="text-red-500 w-6 h-6" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
