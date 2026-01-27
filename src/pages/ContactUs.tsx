
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUs() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-12 relative flex flex-col items-center min-h-[80vh]">
            <div className="w-full max-w-6xl flex flex-col items-center gap-12 relative z-10">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl text-green-900 font-serif font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-green-800/80 max-w-2xl mx-auto">
                        Have questions about voting or the app? Reach out to us.
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                        <h2 className="text-2xl font-serif font-bold text-green-900 mb-6">Send us a message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input type="text" className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all" placeholder="Topic" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all" placeholder="Write your message here..."></textarea>
                            </div>
                            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95">
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8 pt-4">
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">Email Us</h3>
                                <p className="text-gray-600">support@amarballot.bd</p>
                                <p className="text-gray-600">info@amarballot.bd</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Phone className="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">Call Us</h3>
                                <p className="text-gray-600">+880 1711 000000</p>
                                <p className="text-gray-600 leading-relaxed text-sm mt-1 text-gray-500">
                                    Mon-Fri from 9am to 5pm.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full">
                                <MapPin className="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">Visit Office</h3>
                                <p className="text-gray-600">
                                    Nirbachon Bhaban,<br />
                                    Agargaon, Dhaka-1207.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
