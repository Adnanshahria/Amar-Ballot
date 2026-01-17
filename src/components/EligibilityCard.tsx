import { useState } from 'react';

const eligibilityItems = [
    { id: 'nid', label: 'I have my NID' },
    { id: 'polling', label: 'I know my polling center' },
    { id: 'steps', label: 'I understand voting steps' },
    { id: 'rights', label: 'I know my voting rights' },
    { id: 'rules', label: 'I am aware of election-day rules' },
];

export default function EligibilityCard() {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            {/* Title Section */}
            <div className="mb-4">
                <h1 className="text-4xl font-croissant text-[#1a2e4a]">My Vote</h1>
                <div className="water-fill-container">
                    <p className="water-fill-text text-green-700 font-bold text-xl italic">My Future...</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Are you a <span className="text-green-600">voter</span>?
            </h2>

            {/* Eligibility Checklist */}
            <div className="border-2 border-green-500 rounded-lg p-3 mb-3 bg-white">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Check Eligibility</h3>
                <div className="space-y-0.5">
                    {eligibilityItems.map((item) => (
                        <label
                            key={item.id}
                            className="flex items-center gap-2 cursor-pointer py-0.5"
                        >
                            <input
                                type="checkbox"
                                checked={checked[item.id] || false}
                                onChange={() => toggleItem(item.id)}
                                className="w-3.5 h-3.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-xs text-gray-700">
                                {item.label.split(' ').map((word, i) =>
                                    ['NID', 'polling', 'voting', 'election-day'].some(kw => word.includes(kw)) ? (
                                        <span key={i} className="font-semibold">{word} </span>
                                    ) : (
                                        <span key={i}>{word} </span>
                                    )
                                )}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <button className="w-full py-2 rounded-lg font-semibold bg-green-400 text-green-900 hover:bg-green-500 transition-all">
                Result
            </button>
        </div>
    );
}
