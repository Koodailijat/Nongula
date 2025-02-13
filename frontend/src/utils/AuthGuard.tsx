import { useAuth } from '../hooks/useAuth.tsx';
import { Navigate, Outlet } from 'react-router';

export function AuthGuard() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
