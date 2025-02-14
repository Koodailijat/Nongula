import { useMemo } from 'react';
import { useAuthLocalStorage } from './useAuthLocalStorage.tsx';

export function useAuth() {
    const [getAccessToken] = useAuthLocalStorage();
    const isAuthenticated = useMemo(() => !!getAccessToken, [getAccessToken]);

    return {
        isAuthenticated,
    };
}
