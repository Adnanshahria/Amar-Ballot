
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function VideoTutorials() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center min-h-[80vh]">
            <div className="w-full max-w-6xl flex flex-col items-center gap-12 relative z-10 pt-10">

                <div className="w-full text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-green-800 drop-shadow-sm">
                        {t.videoTutorials.title}
                    </h1>
                    <p className="text-green-600 mt-2 font-medium">{t.videoTutorials.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-2 sm:px-0">

                    {/* Video 1: How to Vote */}
                    <div className="bg-white p-3 rounded-2xl shadow-lg border border-green-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/wBudmDxFQy4?rel=0"
                                title={t.videoTutorials.videos[0]}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-gray-800 font-serif px-1">{t.videoTutorials.videos[0]}</h3>
                    </div>

                    {/* Video 2: Desher Chabi */}
                    <div className="bg-white p-3 rounded-2xl shadow-lg border border-green-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/Wujw0I6y4P8?rel=0"
                                title={t.videoTutorials.videos[1]}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-gray-800 font-serif px-1">{t.videoTutorials.videos[1]}</h3>
                    </div>

                    {/* Video 3: Chief Advisor Message */}
                    <div className="bg-white p-3 rounded-2xl shadow-lg border border-green-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/PnpX2NOytqQ?rel=0"
                                title={t.videoTutorials.videos[2]}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-gray-800 font-serif px-1">{t.videoTutorials.videos[2]}</h3>
                    </div>

                    {/* Video 4: Education Institutions */}
                    <div className="bg-white p-3 rounded-2xl shadow-lg border border-green-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/yKpnnv6-pSk?rel=0"
                                title={t.videoTutorials.videos[3]}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-gray-800 font-serif px-1">{t.videoTutorials.videos[3]}</h3>
                    </div>

                </div>


            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
