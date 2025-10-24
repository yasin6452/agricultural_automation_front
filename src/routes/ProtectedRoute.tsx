import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // اگر لاگین نکرده بود، به صفحه لاگین هدایت می‌شه
        return <Navigate to="/login" replace />;
    }

    // اگر لاگین کرده بود، صفحه رو نمایش می‌ده
    return <>{children}</>;
};