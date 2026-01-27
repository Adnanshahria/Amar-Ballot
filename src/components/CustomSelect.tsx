import { useState, useEffect } from 'react';
import { ChevronDown, X, Check, MapPin } from 'lucide-react';

interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
}

export default function CustomSelect({ label, value, onChange, options, placeholder = 'Select Option' }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter options based on search
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset search when closed
    useEffect(() => {
        if (!isOpen) setSearchTerm('');
    }, [isOpen]);

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

            {/* Trigger */}
            <div
                onClick={() => setIsOpen(true)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 flex items-center justify-between cursor-pointer hover:border-green-500 hover:ring-2 hover:ring-green-100 transition-all bg-white"
            >
                <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Blurred Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Select Popup */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[80vh] overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 border border-green-100 flex flex-col">

                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                            <h2 className="text-lg font-bold font-serif text-green-900 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-green-600" />
                                {label}
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Search Bar (Optional but good for long lists like Districts) */}
                        <div className="p-2 border-b border-gray-100 bg-gray-50">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
                                autoFocus
                            />
                        </div>

                        {/* Options List */}
                        <div className="overflow-y-auto flex-1 p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            onChange(option);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between
                                            ${value === option
                                                ? 'bg-green-50 text-green-700'
                                                : 'hover:bg-gray-50 text-gray-700 hover:text-green-600'
                                            }
                                        `}
                                    >
                                        {option}
                                        {value === option && <Check className="w-4 h-4 text-green-600" />}
                                    </button>
                                ))
                            ) : (
                                <div className="py-8 text-center text-gray-400 text-sm">
                                    No options found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
