import { ArrowRight, CheckCircle, FileText, UserPlus, Fingerprint, Vote } from 'lucide-react';

export default function VoterGuide() {
    const steps = [
        {
            icon: <UserPlus className="w-8 h-8 text-green-600" />,
            title: "Check Voter List",
            desc: "Ensure your name is on the voter list for your constituency."
        },
        {
            icon: <Fingerprint className="w-8 h-8 text-green-600" />,
            title: "Bring Valid ID",
            desc: "Carry your National ID (NID) card or Smart Card to the polling station."
        },
        {
            icon: <FileText className="w-8 h-8 text-green-600" />,
            title: "Collect Ballot Paper",
            desc: "Verification officers will check your ID and issue a ballot paper."
        },
        {
            icon: <Vote className="w-8 h-8 text-green-600" />,
            title: "Cast Your Vote",
            desc: "Go to the secret booth, stamp your choice, and drop it in the ballot box."
        }
    ];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">How to Vote</h1>

                <div className="space-y-6">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-green-100 flex items-start gap-6 hover:shadow-md transition-shadow">
                            <div className="bg-green-100 p-4 rounded-full flex-shrink-0">
                                {step.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </div>
                            <div className="hidden md:block self-center">
                                <ArrowRight className="w-6 h-6 text-green-300" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-green-600 text-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-2">Ready to Vote?</h3>
                        <p className="text-green-50">Find your nearest polling station now.</p>
                    </div>
                    <button className="bg-white text-green-800 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-md">
                        Find Vote Center
                    </button>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
