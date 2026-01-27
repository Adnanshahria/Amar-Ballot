import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';
import Modal from '../components/Modal';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';

const DISTRICTS = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
    "Brahmanbaria", "Chandpur", "Chapainawabganj", "Chattogram", "Chuadanga",
    "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni",
    "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
    "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj",
    "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura",
    "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon",
    "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari",
    "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari",
    "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur",
    "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

export default function NIDVerification() {
    const { user, verify } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nidNumber: '',
        dateOfBirth: '',
        voterArea: ''
    });
    const [skipNID, setSkipNID] = useState(false);
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

        // Validation: NID is required ONLY if skipNID is false
        if ((!skipNID && !formData.nidNumber) || !formData.dateOfBirth || !formData.voterArea) {
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
            // If skipping, send 'Not Provided' or empty string for NID
            const dataToVerify = {
                ...formData,
                nidNumber: skipNID ? 'Not Provided' : formData.nidNumber
            };

            const result = await verify(user.id, dataToVerify);
            setLoading(false);

            if (result.success) {
                setModal({
                    isOpen: true,
                    title: 'Verification Successful!',
                    message: 'Your voter area has been confirmed. You can now access your dashboard.',
                    type: 'success'
                });
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setModal({
                    isOpen: true,
                    title: 'Verification Failed',
                    message: 'Could not verify your details. Please try again.',
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
                    <p className="text-gray-600 mt-2">Please provide your details to confirm your voter eligibility.</p>
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
                            disabled={skipNID}
                            className={`w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition-all ${skipNID ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                }`}
                        />
                        <div className="flex items-center mt-2 gap-2">
                            <input
                                type="checkbox"
                                id="skipNID"
                                checked={skipNID}
                                onChange={(e) => setSkipNID(e.target.checked)}
                                className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                            />
                            <label htmlFor="skipNID" className="text-sm text-gray-600 select-none cursor-pointer">
                                I don't want to share my NID Number (I am a valid voter)
                            </label>
                        </div>
                    </div>



                    <div>
                        <DatePicker
                            label="Date of Birth"
                            value={formData.dateOfBirth}
                            onChange={(date: string) => setFormData({ ...formData, dateOfBirth: date })}
                        />
                    </div>

                    <div>
                        <CustomSelect
                            label="District"
                            value={formData.voterArea}
                            onChange={(value: string) => setFormData({ ...formData, voterArea: value })}
                            options={DISTRICTS}
                            placeholder="Select District"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                    </button>

                    <button type="button" onClick={() => navigate('/dashboard')} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
                        Back to Dashboard
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
