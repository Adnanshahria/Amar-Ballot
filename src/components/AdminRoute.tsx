import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';

export default function AdminRoute() {
    const { user, isLoggedIn } = useAuth();

    // If logged in AND role is admin, show the content (Dashboard)
    if (isLoggedIn && user?.role === 'admin') {
        return <Outlet />;
    }

    // Otherwise, show the Verification Popup Login
    // Note: We render it properly here, preventing access to the Children (Outlet)
    return <AdminLogin />;
}
