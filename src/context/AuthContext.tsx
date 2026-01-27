import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser, verifyUser } from '../lib/api';

interface AuthContextType {
    isLoggedIn: boolean;
    user: any | null;
    login: (credentials: any) => Promise<{ success: boolean; message?: string; user?: any }>;
    register: (userData: any) => Promise<{ success: boolean; error?: any }>;
    verify: (userId: number, nidData: any) => Promise<{ success: boolean; error?: any }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any | null>(null);

    const login = async (credentials: any) => {
        const result = await loginUser(credentials);
        if (result.success) {
            setIsLoggedIn(true);
            setUser(result.user);
            // In a real app, store token in localStorage here
            return result;
        }
        return { success: false, message: result.message || "Login failed" };
    };

    const register = async (userData: any) => {
        const result = await registerUser(userData);
        if (result.success) {
            // Optional: Auto-login after register? Or just return success
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const verify = async (userId: number, nidData: any) => {
        const result = await verifyUser(userId, nidData);
        if (result.success) {
            // Update local user state immediately
            setUser((prev: any) => ({
                ...prev,
                verification_status: 'verified',
                nid_number: nidData.nidNumber,
                voter_area: nidData.voterArea
            }));
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        // Clear token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, register, verify, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
