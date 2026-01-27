import { AlertTriangle, Send } from 'lucide-react';

export default function ReportIncident() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-2xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Report an Incident</h1>

                <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-red-100">
                    <div className="flex items-center gap-4 mb-6 bg-red-50 p-4 rounded-xl border border-red-200">
                        <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                        <p className="text-red-800 text-sm">
                            Use this form to report code of conduct violations, violence, or voting irregularities. Your identity will remain confidential.
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none">
                                <option>Select Type...</option>
                                <option>Violence / Harassment</option>
                                <option>Vote Buying / Bribery</option>
                                <option>Fake News / Misinformation</option>
                                <option>Polling Station Irregularity</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="E.g., Dhanmondi Boys School Center" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none h-32" placeholder="Describe what happened..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Evidence (Optional)</label>
                            <input type="file" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
                        </div>

                        <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md mt-4 flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Submit Report
                        </button>
                    </form>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
