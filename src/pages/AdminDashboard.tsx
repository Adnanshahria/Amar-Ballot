import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Users, Vote, MapPin, Calendar, ShieldAlert } from 'lucide-react';
import { getDashboardStats } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ users: 0, candidates: 0, centers: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const result = await getDashboardStats();
            if (result?.success) {
                setStats(result.stats);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Manage your election system</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors font-medium shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Users Card */}
                    <div
                        onClick={() => navigate('/adm/users')}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-600 transition-colors">Total Users</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.users}</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>

                    {/* Candidates Card */}
                    <div
                        onClick={() => navigate('/adm/candidates')}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-green-600 transition-colors">Total Candidates</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.candidates}</h3>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                            <Vote className="w-6 h-6 text-green-600" />
                        </div>
                    </div>

                    {/* Centers Card */}
                    <div
                        onClick={() => navigate('/adm/centers')}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-purple-600 transition-colors">Vote Centers</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.centers}</h3>
                            {/* Updates Card */}
                            <div
                                onClick={() => navigate('/adm/updates')}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-600 transition-colors">Updates & News</p>
                                    <h3 className="text-xl font-bold text-gray-900">Manage</h3>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>

                            {/* Rumors Card */}
                            <div
                                onClick={() => navigate('/adm/rumors')}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-orange-600 transition-colors">Rumor Check</p>
                                    <h3 className="text-xl font-bold text-gray-900">Manage</h3>
                                </div>
                                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                    <ShieldAlert className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                            <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
