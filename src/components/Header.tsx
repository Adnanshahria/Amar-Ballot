import { Bell, Globe, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImg from '../assets/logo.png';

const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact Us', href: '#contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 px-2 pt-1 md:px-4 md:pt-2">
            {/* Header Container with boxy shape */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-md rounded-xl md:rounded-2xl border border-green-200 font-inter">
                <div className="w-full px-2 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center h-12 md:h-16">
                        {/* Logo - Smaller on mobile */}
                        <div className="flex items-center gap-1 md:gap-2 bg-white px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-gray-200 shadow-sm">
                            <img src={logoImg} alt="Amar Ballot" className="h-6 md:h-10 w-auto" />
                            <span className="font-bold text-sm md:text-xl text-green-700 italic">Amar Ballot</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition-all px-4 py-2 rounded-xl flex items-center gap-1 bg-white border border-gray-200 shadow-sm"
                                >
                                    {link.name === 'Home' && <span>🏠</span>}
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <button className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                                <Globe className="h-4 w-4" />
                                <span className="text-sm font-medium">EN</span>
                            </button>
                            <button className="relative text-gray-600 hover:text-green-600 transition-colors bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors shadow-md">
                                <LogIn className="h-4 w-4" />
                                <span className="font-medium">Login</span>
                            </button>
                        </div>

                        {/* Mobile Actions - Visible on mobile */}
                        <div className="flex md:hidden items-center gap-2">
                            <button className="flex items-center gap-1 text-gray-600 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-sm text-xs">
                                <Globe className="h-3 w-3" />
                                <span className="font-medium">EN</span>
                            </button>
                            <button className="relative text-gray-600 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm">
                                <Bell className="h-4 w-4" />
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button
                                className="text-gray-600 bg-white p-1.5 rounded-lg border border-gray-200"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-3">
                            <nav className="flex flex-col gap-1.5">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-gray-700 hover:text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-100 transition-colors bg-white border border-gray-200 text-sm"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-1 text-sm">
                                    <LogIn className="h-4 w-4" />
                                    <span className="font-medium">Login</span>
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
