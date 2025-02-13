import { useLocalStorage } from 'usehooks-ts';
import { storageKeys } from '../constants/storageKeys.ts';

export function useAuthLocalStorage() {
    return useLocalStorage<string | null>(storageKeys.accessToken, null);
}
