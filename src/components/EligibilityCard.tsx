import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function EligibilityCard() {
    const { language } = useLanguage();
    const t = translations[language];
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const eligibilityItems = [
        { id: 'nid', label: t.eligibility.checklist.nid },
        { id: 'polling', label: t.eligibility.checklist.polling },
        { id: 'steps', label: t.eligibility.checklist.steps },
        { id: 'rights', label: t.eligibility.checklist.rights },
        { id: 'rules', label: t.eligibility.checklist.rules },
    ];

    const toggleItem = (id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            {/* Title Section */}
            <div className="mb-4">
                <h1 className="text-4xl font-croissant text-[#1a2e4a]">{t.eligibility.headerMain}</h1>
                <div className="water-fill-container">
                    <p className="water-fill-text text-green-700 font-bold text-xl italic">{t.eligibility.headerSub}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {t.eligibility.question} <span className="text-green-600">{t.eligibility.voter}</span>?
            </h2>

            {/* Eligibility Checklist */}
            <div className="border-2 border-green-500 rounded-lg p-3 mb-3 bg-white">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{t.eligibility.title}</h3>
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
                                {item.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={() => {
                    const allChecked = eligibilityItems.every(item => checked[item.id]);
                    if (allChecked) {
                        window.location.href = '/nid-verification';
                    } else {
                        alert("Please confirm all eligibility criteria.");
                    }
                }}
                className="w-full py-2 rounded-lg font-semibold bg-green-400 text-green-900 hover:bg-green-500 transition-all"
            >
                {t.eligibility.resultBtn}
            </button>
        </div>
    );
}
