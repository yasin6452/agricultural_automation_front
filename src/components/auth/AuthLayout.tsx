import { ReactNode } from 'react';
import '@/styles/auth/Auth.css';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="auth-container vertical">
            <img
                src="/logo.png"
                alt="Smart Agriculture Logo"
                className="auth-logo-top"
            />
            <div className="auth-card">{children}</div>
        </div>
    );
};
