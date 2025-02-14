import { useMemo } from 'react';
import { NutritionData } from '../types/nutrition.ts';

export function useCurrentDayCalories(
    ISODate: string,
    nutrition: NutritionData
) {
    return useMemo(
        () =>
            nutrition?.[ISODate]?.length
                ? nutrition[ISODate].reduce(
                      (totalCalories, food) => totalCalories + food.calories,
                      0
                  )
                : 0,
        [ISODate, nutrition]
    );
}
