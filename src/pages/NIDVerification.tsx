import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Upload } from 'lucide-react';
import Modal from '../components/Modal';

export default function NIDVerification() {
    const { user, verify } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nidNumber: '',
        dateOfBirth: '',
        voterArea: ''
    });
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info' as 'success' | 'error' | 'info'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nidNumber || !formData.dateOfBirth || !formData.voterArea) {
            setModal({
                isOpen: true,
                title: 'Missing Information',
                message: 'Please fill in all details correctly.',
                type: 'error'
            });
            return;
        }

        setLoading(true);
        // Simulate API delay
        setTimeout(async () => {
            const result = await verify(user.id, formData);
            setLoading(false);

            if (result.success) {
                setModal({
                    isOpen: true,
                    title: 'Verification Successful!',
                    message: 'Your NID has been verified. You can now access your voter area.',
                    type: 'success'
                });
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setModal({
                    isOpen: true,
                    title: 'Verification Failed',
                    message: 'Could not verify your NID. Please try again.',
                    type: 'error'
                });
            }
        }, 1500);
    };

    return (
        <main className="flex-1 w-full px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-green-100 p-8 animate-in fade-in zoom-in duration-500">

                <div className="text-center mb-8">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-serif text-green-900 font-bold">Verify Identity</h1>
                    <p className="text-gray-600 mt-2">Please provide your National ID details to verify your voter eligibility.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
                        <input
                            type="text"
                            name="nidNumber"
                            placeholder="e.g. 1993284732"
                            value={formData.nidNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Voter Area (Thana/Upazila)</label>
                        <select
                            name="voterArea"
                            value={formData.voterArea}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
                        >
                            <option value="">Select Area</option>
                            <option value="Dhanmondi">Dhanmondi</option>
                            <option value="Gulshan">Gulshan</option>
                            <option value="Mirpur">Mirpur</option>
                            <option value="Uttara">Uttara</option>
                        </select>
                    </div>

                    <div className="border-2 border-dashed border-green-200 rounded-xl p-6 text-center hover:bg-green-50 transition-colors cursor-pointer group">
                        <Upload className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-sm text-gray-600">Upload NID Scan (Optional)</p>
                        <p className="text-xs text-gray-400">JPG, PNG up to 2MB</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                    </button>

                    <button type="button" onClick={() => navigate('/dashboard')} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
                        Skip for now (Limited Access)
                    </button>
                </form>
            </div>

            <Modal
                isOpen={modal.isOpen}
                onClose={() => {
                    setModal({ ...modal, isOpen: false });
                    if (modal.type === 'success') navigate('/dashboard');
                }}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
        </main>
    );
}
