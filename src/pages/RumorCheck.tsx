import { useState, useEffect } from 'react';
import { getRumors } from '../lib/api';
import { ShieldCheck, ShieldAlert, Search, ExternalLink } from 'lucide-react';

const RumorCard = ({ rumor }: { rumor: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 150;
    const isLongText = rumor.description.length > MAX_LENGTH;

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
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

                {isExpanded && rumor.image_url && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 w-full max-w-sm bg-gray-50">
                        <img
                            src={rumor.image_url}
                            alt="Rumor Evidence"
                            className="w-full h-48 object-contain"
                        />
                    </div>
                )}

                <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-wrap break-all">
                    {isExpanded ? rumor.description : (
                        <>
                            {rumor.description.slice(0, MAX_LENGTH)}
                            {isLongText && '...'}
                        </>
                    )}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                    {(isLongText || rumor.image_url) && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-orange-600 font-semibold hover:text-orange-700 transition-colors text-sm"
                        >
                            {isExpanded ? 'Show Less' : 'Read More & View Evidence'}
                        </button>
                    )}

                    {rumor.source && isExpanded && (
                        <a
                            href={rumor.source.startsWith('http') ? rumor.source : `https://${rumor.source}`}
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
        </div>
    );
};

export default function RumorCheck() {
    const [rumors, setRumors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        // Debounce search to avoid too many DB calls
        const timer = setTimeout(() => {
            loadRumors();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, selectedDate, sortOrder]);

    const loadRumors = async () => {
        setLoading(true);
        const data = await getRumors(searchTerm);

        let filteredData = [...data];

        // Filter by Date
        if (selectedDate) {
            filteredData = filteredData.filter(item => {
                const itemDate = new Date(item.published_at).toISOString().split('T')[0];
                return itemDate === selectedDate;
            });
        }

        // Sort
        if (sortOrder === 'oldest') {
            filteredData.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        } else {
            filteredData.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        }

        setRumors(filteredData);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-12 px-4">
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

                {/* Search and Sort */}
                <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-10">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search for a rumor or topic..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm text-lg"
                        />
                        <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                    <div className="flex gap-2 shrink-0 overflow-x-auto pb-2 md:pb-0">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="pl-4 pr-4 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm text-lg bg-white"
                        />
                        <div className="relative">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                                className="w-full md:w-auto pl-6 pr-10 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm text-lg appearance-none bg-white cursor-pointer"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : rumors.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">No records found.</div>
                    ) : (
                        rumors.map((rumor) => (
                            <RumorCard key={rumor.id} rumor={rumor} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
