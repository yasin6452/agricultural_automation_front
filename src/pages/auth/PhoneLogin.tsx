import { AuthLayout } from '@/components/auth/AuthLayout';
import { PhoneLoginForm } from '@/components/auth/PhoneLoginForm';

export const PhoneLogin = () => {
    return (
        <AuthLayout>
            <PhoneLoginForm />
        </AuthLayout>
    );
};
