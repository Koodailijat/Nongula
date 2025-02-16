import { useEffect, useState } from 'react';
import { FoodOutputDto } from '../types/FoodDto.ts';
import { isEqual } from 'date-fns';

export function useCurrentDayCalories(
    currentDate: string,
    data?: FoodOutputDto[]
) {
    const [calories, setCalories] = useState(0);

    useEffect(() => {
        setCalories(
            data
                ? data
                      .filter((food) => isEqual(food.date, currentDate))
                      .reduce(
                          (totalCalories, food) =>
                              totalCalories + food.calories,
                          0
                      )
                : calories
        );
    }, [currentDate, data]);

    return calories;
}
