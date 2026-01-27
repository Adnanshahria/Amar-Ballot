import { Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function EmergencyContacts() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="flex justify-end gap-4">
            {/* Emergency Contacts & 999 Box */}
            <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-xl border border-gray-200 text-green-700">
                <span className="font-bold">{t.emergency.title}</span>
                <a href="tel:999" className="flex items-center gap-1.5 hover:text-green-500 transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">999</span>
                </a>
            </div>

            {/* Nearby Police Box */}
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl border border-gray-200 text-green-700">
                <a href="#nearby-police" className="flex items-center gap-1.5 hover:text-green-500 transition-colors">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{t.emergency.Police}</span>
                </a>
            </div>
        </div>
    );
}
