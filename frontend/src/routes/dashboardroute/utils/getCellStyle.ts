import { CalendarDate } from '@internationalized/date';
import { CSSProperties } from 'react';
import { format, isEqual } from 'date-fns';
import { FoodOutputDto } from '../../../types/FoodDto.ts';

function getColor(value: number) {
    if (value < 0.2) {
        return '#00c65a';
    } else if (value < 0.4) {
        return '#19a052';
    } else if (value < 0.6) {
        return '#0b9244';
    } else if (value < 0.8) {
        return '#008537';
    } else if (value < 1.1) {
        return '#006824';
    } else if (value < 1.3) {
        return '#bcba29';
    } else if (value < 1.5) {
        return '#c23b26';
    }
    return '#941515';
}

export function getCellStyle(
    date: CalendarDate,
    data: FoodOutputDto[],
    targetCalories: number,
    selectedDate: Date
): CSSProperties {
    const isoDate = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
    const isSelectedDate = isEqual(
        date.toString(),
        format(selectedDate, 'yyyy-MM-dd')
    );

    if (data) {
        const currentDayData = data.filter((food) =>
            isEqual(food.date, isoDate)
        );

        if (currentDayData.length) {
            return {
                background: getColor(
                    currentDayData.reduce(
                        (previousValue, currentValue) =>
                            previousValue + currentValue.calories,
                        0
                    ) / targetCalories
                ),
                outline: isSelectedDate ? '4px solid black' : 'none',
            };
        }
    }
    return { outline: isSelectedDate ? '4px solid black' : 'none' };
}
