import { useState, useEffect } from 'react';
import { getRumors, addRumor, deleteRumor } from '../lib/api';
import { Plus, Trash2, ShieldCheck, ShieldAlert, Save, X, ExternalLink } from 'lucide-react';

export default function AdminRumors() {
    const [rumors, setRumors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', status: 'fake', source: ''
    });

    useEffect(() => {
        fetchRumors();
    }, []);

    const fetchRumors = async () => {
        setLoading(true);
        const data = await getRumors();
        setRumors(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Delete this rumor check?')) {
            await deleteRumor(id);
            fetchRumors();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await addRumor(formData);
        if (result.success) {
            setIsAddModalOpen(false);
            setFormData({ title: '', description: '', status: 'fake', source: '' });
            fetchRumors();
        } else {
            alert('Failed to add rumor');
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Rumor Verification</h1>
                    <p className="text-gray-600">Manage fact-checking database</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 transition-colors font-medium shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Add Rumor Check
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading rumors...</div>
                ) : rumors.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No rumors recorded.</div>
                ) : (
                    rumors.map((rumor) => (
                        <div key={rumor.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                            <div className="mt-1">
                                {rumor.status === 'verified' ? (
                                    <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                ) : (
                                    <div className="bg-red-100 text-red-700 p-2 rounded-lg">
                                        <ShieldAlert className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${rumor.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {rumor.status === 'verified' ? 'Truth / Verified' : 'Fake / Rumor'}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mt-2">{rumor.title}</h3>
                                        <p className="text-gray-600 mt-1">{rumor.description}</p>
                                        {rumor.source && (
                                            <a href={rumor.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 mt-2 hover:underline">
                                                <ExternalLink className="w-3 h-3" /> Source / Reference
                                            </a>
                                        )}
                                    </div>
                                    <button onClick={() => handleDelete(rumor.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Add Fact Check</h2>
                            <button onClick={() => setIsAddModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rumor/Topic Title</label>
                                <input required className="w-full p-3 rounded-lg border border-gray-200"
                                    value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Verdict</label>
                                <select className="w-full p-3 rounded-lg border border-gray-200 bg-white"
                                    value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="fake">Fake / Rumor</option>
                                    <option value="verified">Verified / True</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                                <textarea required rows={4} className="w-full p-3 rounded-lg border border-gray-200"
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Source URL (Optional)</label>
                                <input className="w-full p-3 rounded-lg border border-gray-200"
                                    value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} />
                            </div>
                            <div className="flex justify-end pt-4">
                                <button type="submit" className="bg-orange-600 text-white px-6 py-2.5 rounded-lg hover:bg-orange-700 font-medium flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
