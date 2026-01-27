import { useState, useEffect } from 'react';
import { getRumors } from '../lib/api';
import { ShieldCheck, ShieldAlert, Search, ExternalLink } from 'lucide-react';

export default function RumorCheck() {
    const [rumors, setRumors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadRumors = async () => {
            const data = await getRumors();
            setRumors(data);
            setLoading(false);
        };
        loadRumors();
    }, []);

    const filteredRumors = rumors.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldAlert className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Rumor Check & Verification</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Verify election-related information. We fact-check viral claims to ensure you have accurate information.
                    </p>
                </div>

                {/* Search */}
                <div className="relative max-w-2xl mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search for a rumor or topic..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm text-lg"
                    />
                    <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : filteredRumors.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">No records found.</div>
                    ) : (
                        filteredRumors.map((rumor) => (
                            <div key={rumor.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                                <div className="shrink-0 flex md:block justify-center">
                                    {rumor.status === 'verified' ? (
                                        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl flex flex-col items-center gap-1 w-32 border border-green-100">
                                            <ShieldCheck className="w-8 h-8" />
                                            <span className="font-bold text-sm uppercase tracking-wide">Verified</span>
                                        </div>
                                    ) : (
                                        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl flex flex-col items-center gap-1 w-32 border border-red-100">
                                            <ShieldAlert className="w-8 h-8" />
                                            <span className="font-bold text-sm uppercase tracking-wide">Fake</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">{rumor.title}</h2>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{rumor.description}</p>

                                    {rumor.source && (
                                        <a
                                            href={rumor.source}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            View Source / Fact Check
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
