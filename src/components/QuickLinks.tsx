import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function QuickLinks() {
    const { language } = useLanguage();
    const t = translations[language];

    const quickLinks = [
        { label: t.home.quickLinks.updates, path: '/election-updates' },
        { label: t.home.quickLinks.center, path: '/vote-center' },
        { label: t.home.quickLinks.course, path: '/course' },
        { label: t.home.quickLinks.candidateList, path: '/candidate-list' },
        { label: t.home.quickLinks.rumor, path: '/rumor-check' },
        { label: t.home.quickLinks.tutorials, path: '/video-tutorials' },
        { label: t.home.quickLinks.badge, path: '/civic-badge' },
    ];

    return (
        <div className="h-full flex flex-col justify-center gap-4 p-4">
            {/* Ready to Vote Header - styled as a pill */}
            <div className="w-full py-3.5 px-6 rounded-full bg-white shadow-sm text-center mb-1">
                <h2 className="text-green-600 font-bold font-serif text-2xl italic">
                    {t.home.readyToVote}
                </h2>
            </div>

            <div className="space-y-2">
                {quickLinks.map((link, index) => {
                    return (
                        <Link
                            key={index}
                            to={link.path}
                            className="block w-full py-3.5 px-6 rounded-full bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-center group"
                        >
                            <span className="font-bold text-gray-600 text-lg group-hover:text-green-700 font-serif">
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
