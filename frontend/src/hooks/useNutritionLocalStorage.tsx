import { useLocalStorage } from 'usehooks-ts';
import { NutritionData } from '../types/nutrition.ts';

export function useNutritionLocalStorage() {
    return useLocalStorage<NutritionData>('nutrition', {});
}
