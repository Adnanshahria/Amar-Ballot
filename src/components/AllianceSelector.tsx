import { CheckCircle2, Circle } from 'lucide-react';

interface AllianceSelectorProps {
    selectedAlliance: string | null;
    onSelect: (alliance: string) => void;
}

const ALLIANCES = [
    { id: 'bnp_jot', label: 'Bnp and his Jot', color: 'bg-emerald-100 border-emerald-500 text-emerald-900' },
    { id: 'jamaat_jot', label: 'Jmater 11 dolio joot', color: 'bg-teal-100 border-teal-500 text-teal-900' },
    { id: 'bam_jot', label: 'Bam Jot', color: 'bg-red-100 border-red-500 text-red-900' },
    { id: 'independent', label: 'Independate candidate', color: 'bg-gray-100 border-gray-500 text-gray-900' },
];

export default function AllianceSelector({ selectedAlliance, onSelect }: AllianceSelectorProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-6">
            <h2 className="text-xl text-green-800 font-serif font-bold text-center mb-4">
                Which alliance matches your view?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALLIANCES.map((alliance) => (
                    <div
                        key={alliance.id}
                        onClick={() => onSelect(alliance.id)}
                        className={`
                            relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 flex items-center gap-3
                            ${selectedAlliance === alliance.id
                                ? `${alliance.color} shadow-md scale-[1.02]`
                                : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50'
                            }
                        `}
                    >
                        {selectedAlliance === alliance.id ? (
                            <CheckCircle2 className="w-6 h-6 text-green-700 shrink-0" />
                        ) : (
                            <Circle className="w-6 h-6 text-gray-300 shrink-0" />
                        )}
                        <span className="font-serif font-medium text-lg">
                            {alliance.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
