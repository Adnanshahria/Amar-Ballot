import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Vote,
    MapPin,
    Calendar,
    ShieldAlert,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navigation = [
        { name: 'Dashboard', href: '/adm', icon: LayoutDashboard },
        { name: 'Users', href: '/adm/users', icon: Users },
        { name: 'Candidates', href: '/adm/candidates', icon: Vote },
        { name: 'Vote Centers', href: '/adm/centers', icon: MapPin },
        { name: 'Updates', href: '/adm/updates', icon: Calendar },
        { name: 'Rumor Check', href: '/adm/rumors', icon: ShieldAlert },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white fixed h-full z-30">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white">
                            AB
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-none">Admin Panel</h1>
                            <p className="text-xs text-slate-400 mt-1">Amar Ballot System</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = item.href === '/adm'
                            ? location.pathname === '/adm'
                            : location.pathname.startsWith(item.href);

                        return (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive: linkActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${isActive || linkActive
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/20'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                                {(isActive) && <ChevronRight className="w-4 h-4 ml-auto" />}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800 rounded-xl p-4 mb-4">
                        <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-slate-400 mt-0.5 capitalize">{user?.role || 'Administrator'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Overlay */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-40 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold">AB</div>
                    <span className="font-bold">Admin Panel</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-30 bg-slate-900 pt-20 px-4">
                    <nav className="space-y-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-4 rounded-xl transition-all
                                    ${isActive ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800'}
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-lg">{item.name}</span>
                            </NavLink>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-4 w-full text-left text-red-400 mt-8 border-t border-slate-800"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium text-lg">Sign Out</span>
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 min-h-screen">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
