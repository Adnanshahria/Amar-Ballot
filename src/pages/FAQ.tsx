import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "Who is eligible to vote?",
            a: "Any Bangladeshi citizen who is at least 18 years old and registered in the voter list is eligible to vote."
        },
        {
            q: "What documents do I need to bring?",
            a: "You must bring your National ID (NID) card. In some cases, the Smart Card or a slip provided by the Election Commission is also accepted."
        },
        {
            q: "Can I vote from a different location?",
            a: "No, you must vote at the specific polling center assigned to your registered address."
        },
        {
            q: "How do I find my polling center?",
            a: "You can use the 'Find Vote Center' feature on this website by entering your NID number and date of birth."
        },
        {
            q: "What if I lost my NID card?",
            a: "You should contact the nearest Election Commission office immediately to obtain a duplicate or provisional document for voting."
        }
    ];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-3xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Frequently Asked Questions</h1>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-green-100 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-green-50 transition-colors"
                            >
                                <span className="font-semibold text-green-900 text-lg">{faq.q}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-green-600" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-green-600" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 text-gray-600 border-t border-green-100 bg-green-50/30">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
