import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getCandidates } from '../lib/api';
import type { Candidate } from '../lib/types';


const divisions = ['Dhaka', 'Rajshahi', 'Chittagong', 'Barishal', 'Khulna', 'Sylhet', 'Mymensingh', 'Rangpur'];

const districtsByDivision: Record<string, string[]> = {
    'Dhaka': ['Faridpur', 'Narayanganj', 'Gazipur', 'Manikganj'],
    'Rajshahi': ['Rajshahi', 'Bogura', 'Pabna', 'Natore'],
    'Chittagong': ['Chittagong', 'Comilla', 'Feni', 'Cox\'s Bazar'],
    'Barishal': ['Barishal', 'Patuakhali', 'Bhola', 'Jhalokathi'],
    'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
    'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha'],
};

const areasByDistrict: Record<string, string[]> = {
    'Faridpur': ['Faridpur-1', 'Faridpur-2', 'Faridpur-3'],
    'Narayanganj': ['Narayanganj-1', 'Narayanganj-2'],
    'Gazipur': ['Gazipur-1', 'Gazipur-2', 'Gazipur-3', 'Gazipur-4'],
    // Add more as needed, defaulting to generic
};

export default function CandidateList() {
    const { language } = useLanguage(); // Use in future for static labels

    const [selectedDivision, setSelectedDivision] = useState<string | null>('Dhaka');
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>('Faridpur');
    const [selectedArea, setSelectedArea] = useState<string | null>('Faridpur-3');
    const [showResults, setShowResults] = useState(false);

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showResults && selectedArea) {
            setLoading(true);
            getCandidates().then(data => {
                // Filter by area (in real app, assume API filters or we filter here)
                // For now, fetching ALL and filtering client side for demo
                const filtered = data.filter(c => c.area === selectedArea);
                setCandidates(filtered);
                setLoading(false);
            });
        }
    }, [showResults, selectedArea]);

    const districts = selectedDivision ? districtsByDivision[selectedDivision] || [] : [];
    const areas = selectedDistrict ? areasByDistrict[selectedDistrict] || [`${selectedDistrict}-1`, `${selectedDistrict}-2`, `${selectedDistrict}-3`] : [];

    const handleDivisionClick = (division: string) => {
        setSelectedDivision(division);
        setSelectedDistrict(null);
        setSelectedArea(null);
        setShowResults(false);
    };

    const handleDistrictClick = (district: string) => {
        setSelectedDistrict(district);
        setSelectedArea(null);
        setShowResults(false);
    };


    const handleAreaClick = (area: string) => {
        setSelectedArea(area);
    };

    const handleContinue = () => {
        if (selectedDivision && selectedDistrict && selectedArea) {
            setShowResults(true);
        }
    };

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">

            {/* Main Content Container */}
            <div className="w-full max-w-5xl flex flex-col items-center gap-8 relative z-10">

                {/* Title */}
                <h1 className="text-4xl text-green-900 font-serif font-medium text-center">
                    Candidate List
                </h1>

                {/* Division Selector */}
                <div className="flex flex-col items-center gap-4 w-full">
                    <button className="bg-green-700 text-white font-serif text-xl px-12 py-3 rounded-md shadow-lg w-full max-w-md cursor-default">
                        Select Your Division
                    </button>

                    {/* Division List */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-green-800 font-serif text-lg text-center">
                        {divisions.map((division) => (
                            <span
                                key={division}
                                onClick={() => handleDivisionClick(division)}
                                className={`cursor-pointer px-2 py-1 rounded transition-all hover:bg-green-100 ${selectedDivision === division ? 'border border-green-600 bg-green-50 font-bold' : ''}`}
                            >
                                {division}
                            </span>
                        ))}
                    </div>
                </div>

                {/* District and Area Selectors */}
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mt-4">

                    {/* District Column */}
                    <div className="flex-1 flex flex-col gap-2">
                        <button className="bg-green-600/90 text-white font-serif text-xl px-4 py-2 rounded-t-md text-center shadow cursor-default">
                            Choose Your District
                        </button>
                        <div className="bg-green-50/80 rounded-b-md p-2 flex flex-col gap-1 items-center max-h-48 overflow-y-auto">
                            <div className="flex items-center gap-2 bg-green-100/80 w-full px-3 py-2 rounded">
                                <Search className="w-4 h-4 text-green-800" />
                                <span className="text-green-900 font-medium">{selectedDistrict || 'Select...'}</span>
                            </div>
                            {districts.map((district) => (
                                <span
                                    key={district}
                                    onClick={() => handleDistrictClick(district)}
                                    className={`text-green-800 py-1 cursor-pointer w-full text-center rounded hover:bg-green-200 transition-colors ${selectedDistrict === district ? 'bg-green-200 font-bold' : ''}`}
                                >
                                    {district}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Area Column */}
                    <div className="flex-1 flex flex-col gap-2">
                        <button className="bg-green-700 text-white font-serif text-xl px-4 py-2 rounded-t-md text-center shadow cursor-default">
                            Choose Your Area
                        </button>
                        <div className="bg-green-50/80 rounded-b-md p-2 flex flex-col gap-1 items-center max-h-48 overflow-y-auto">
                            <div className={`w-full px-3 py-2 rounded text-center text-green-900 font-medium ${selectedArea ? 'bg-green-100/80 border-l-4 border-green-600' : 'bg-green-50'}`}>
                                {selectedArea || 'Select...'}
                            </div>
                            {areas.map((area) => (
                                <span
                                    key={area}
                                    onClick={() => handleAreaClick(area)}
                                    className={`text-green-800 py-1 cursor-pointer w-full text-center rounded hover:bg-green-200 transition-colors ${selectedArea === area ? 'bg-green-200 font-bold' : ''}`}
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Continue/Show Results Button */}
                {!showResults && (
                    <div className="mt-8">
                        <button
                            onClick={handleContinue}
                            disabled={!selectedDivision || !selectedDistrict || !selectedArea}
                            className={`w-32 h-32 rounded-full text-white font-serif text-center p-4 flex flex-col items-center justify-center shadow-xl transition-transform border-4 border-green-100/20 ${selectedDivision && selectedDistrict && selectedArea ? 'bg-gradient-to-br from-green-600 to-green-800 hover:scale-105 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            <span className="text-xl leading-tight">Click to Continue</span>
                        </button>
                    </div>
                )}

                {/* Results Section (Visible after clicking continue) */}
                {showResults && (
                    <div className="w-full max-w-4xl mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-full bg-green-700 text-white font-serif text-xl px-4 py-3 rounded-t-md shadow mb-4 text-center">
                            {loading ? (
                                <span>Loading candidates...</span>
                            ) : (
                                <span>Available Candidates in {selectedArea} ({candidates.length})</span>
                            )}
                        </div>

                        {!loading && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {candidates.length > 0 ? (
                                    candidates.map((candidate) => (
                                        <div key={candidate.id} className="bg-green-50/90 rounded-xl p-4 flex flex-col items-center border border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                                            <div className="bg-white px-6 py-2 rounded-full text-green-800 font-serif font-bold mb-4 shadow-sm w-full text-center">
                                                {language === 'bn' ? candidate.name_bn || candidate.name : candidate.name}
                                            </div>
                                            <div className="mb-4 text-4xl">
                                                {candidate.symbol} {/* Display Symbol directly */}
                                            </div>
                                            <div className="text-sm text-green-700 font-medium mb-2">
                                                {language === 'bn' ? candidate.party_bn || candidate.party : candidate.party}
                                            </div>
                                            <button className="w-full bg-white border border-green-300 text-green-800 text-sm py-1 rounded shadow-sm hover:bg-green-50">
                                                {language === 'bn' ? "বিস্তারিত দেখুন" : "Tap to see details"}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center text-gray-500 py-8">
                                        {language === 'bn'
                                            ? "এই এলাকার জন্য কোনো প্রার্থী পাওয়া যায়নি।"
                                            : "No candidates found for this area in the database."}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                )}

            </div>

            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>

        </main>
    );
}
