import { LogOut } from 'lucide-react';
import { Button } from '../../stories/components/Button/Button.tsx';
import { useNavigate } from 'react-router';
import { useAuthLocalStorage } from '../hooks/useAuthLocalStorage.tsx';
import { useIsDesktopMode } from '../hooks/useIsDesktopMode.tsx';

export function LogoutButton() {
    const navigate = useNavigate();
    const [, , clearAuth] = useAuthLocalStorage();
    const isDesktopMode = useIsDesktopMode();

    function handleLogout() {
        clearAuth();
        navigate('/');
    }

    return (
        <Button
            onPress={handleLogout}
            className="logout-button"
            icon={<LogOut />}>
            {isDesktopMode ? 'Logout' : ''}
        </Button>
    );
}
