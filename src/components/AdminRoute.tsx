// import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';

export default function AdminRoute() {
    const { user, isLoggedIn } = useAuth();

    // If logged in AND role is admin, show the content wrapped in Layout
    if (isLoggedIn && user?.role === 'admin') {
        return (
            <AdminLayout />
        );
    }

    // Otherwise, show the Verification Popup Login
    return <AdminLogin />;
}
