import { CalendarCellProps } from '../../../../stories/components/Calendar/Calendar.tsx';
import { FoodOutputDto } from '../../../types/FoodDto.ts';
import { useMemo, useRef } from 'react';
import { useCalendarCell } from 'react-aria';
import { isEqual } from 'date-fns';

function getColorMode(value: number, min: number, max: number) {
    if (value < 0.2) {
        return 'white';
    } else if (value < min) {
        return 'yellow';
    } else if (value < max) {
        return 'green';
    }
    return 'red';
}

interface CustomCalendarCellProps<T> extends CalendarCellProps<T> {
    target_min: number;
    target_max: number;
    colorblind?: boolean;
}

export function CustomCalendarCell<T extends Omit<FoodOutputDto, 'userId'>>({
    state,
    date,
    data,
    target_min,
    target_max,
    colorblind,
}: CustomCalendarCellProps<T>) {
    const ref = useRef(null);
    const {
        cellProps,
        buttonProps,
        isSelected,
        isOutsideVisibleRange,
        isDisabled,
        isUnavailable,
        formattedDate,
    } = useCalendarCell({ date }, state, ref);

    const value = useMemo(
        () =>
            data
                .filter((food) => isEqual(food.date, date.toString()))
                .reduce(
                    (previousValue, currentValue) =>
                        previousValue + currentValue.calories,
                    0
                ),
        [data, date]
    );

    return (
        <td {...cellProps}>
            <div
                {...buttonProps}
                ref={ref}
                hidden={isOutsideVisibleRange}
                data-colorblind={colorblind}
                data-selected={isSelected}
                data-disabled={isDisabled}
                data-unavailable={isUnavailable}
                className={`calendar-cell ${getColorMode(value, target_min, target_max)}`}>
                {formattedDate}
            </div>
        </td>
    );
}
