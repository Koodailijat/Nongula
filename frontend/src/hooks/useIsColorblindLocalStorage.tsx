import { useLocalStorage } from 'usehooks-ts';
import { storageKeys } from '../constants/storageKeys.ts';

export function useIsColorblindLocalStorage() {
    return useLocalStorage<boolean>(storageKeys.colorblind, false);
}
