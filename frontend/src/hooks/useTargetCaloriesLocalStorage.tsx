import { useLocalStorage } from 'usehooks-ts';

export function useTargetCaloriesLocalStorage() {
    return useLocalStorage<number>('target_calories', 2000);
}
