
import { Map, Search, BookOpen, AlertTriangle, FileText, Smartphone } from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: Map,
            title: "Vote Center Locator",
            description: "Find your designated polling station instantly by entering your NID or voter details. Get directions and accessibility info."
        },
        {
            icon: Search,
            title: "Candidate Information",
            description: "View detailed profiles of all candidates in your area, including their background, manifesto, and track record."
        },
        {
            icon: BookOpen,
            title: "Voter Education",
            description: "Access video tutorials and guides on how to vote, required documents, and understanding the ballot paper."
        },
        {
            icon: AlertTriangle,
            title: "Rumor Check",
            description: "Verify viral news and claims regarding the election. We help you separate fact from fiction."
        },
        {
            icon: FileText,
            title: "Sample Ballot",
            description: "Practice voting with a digital sample ballot customized for your constituency to avoid mistakes on election day."
        },
        {
            icon: Smartphone,
            title: "Digital Assistant",
            description: "Our AI assistant 'Prerona' is available 24/7 to answer your queries about eligibility and election rules."
        }
    ];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-12 relative flex flex-col items-center min-h-[80vh]">
            <div className="w-full max-w-6xl flex flex-col gap-10 relative z-10">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl text-green-900 font-serif font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-green-800/80 max-w-3xl mx-auto">
                        Everything you need to be a confident and responsible voter.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-white p-6 rounded-2xl border border-green-100 shadow-md hover:shadow-xl hover:border-green-300 transition-all duration-300 flex flex-col items-start gap-4">
                            <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-600 transition-colors duration-300">
                                <service.icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-green-50 rounded-2xl p-8 border border-green-200 text-center">
                    <h2 className="text-2xl font-serif font-bold text-green-900 mb-4">Need personalized help?</h2>
                    <button className="bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition-colors shadow-lg">
                        Chat with Prerona
                    </button>
                </div>

            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
