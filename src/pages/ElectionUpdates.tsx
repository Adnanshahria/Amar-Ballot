import { useState, useEffect } from 'react';
import { getUpdates } from '../lib/api';
import { Calendar, Bell, ChevronDown } from 'lucide-react';

export default function ElectionUpdates() {
    const [updates, setUpdates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        const loadUpdates = async () => {
            const data = await getUpdates();
            setUpdates(data);
            setLoading(false);
        };
        loadUpdates();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Election Updates</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay informed with the latest announcements, schedule changes, and official news regarding the election.
                    </p>
                </div>

                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading updates...</p>
                        </div>
                    ) : updates.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm text-gray-500">
                            No updates published yet.
                        </div>
                    ) : (
                        updates.map((update) => (
                            <div key={update.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:w-2 transition-all"></div>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setExpandedId(expandedId === update.id ? null : update.id)}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(update.published_at).toLocaleDateString(undefined, {
                                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === update.id ? 'rotate-180' : ''}`} />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{update.title}</h2>
                                </div>

                                {expandedId === update.id && (
                                    <div className="mt-4 animate-fadeIn">
                                        {update.image_url && (
                                            <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                                                <img
                                                    src={update.image_url}
                                                    alt={update.title}
                                                    className="w-full h-auto max-h-[600px] object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="prose prose-blue max-w-none text-gray-600">
                                            <p className="whitespace-pre-wrap leading-relaxed">{update.content}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
