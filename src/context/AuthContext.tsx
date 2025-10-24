import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تایپ کاربر
interface User {
    phone: string;
    firstName?: string;
    lastName?: string;
    nationalCode?: string;
    birthDate?: string;
    province?: string;
    city?: string;
    isRegistered: boolean;
}

// تایپ Context
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    logout: () => void;
    loading: boolean;
}

// ساخت Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // چک کردن لاگین بودن کاربر هنگام لود صفحه
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    }, []);

    // تابع خروج
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tempPhone');
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom Hook برای استفاده از Context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};