import { CalendarCellProps } from '../../../../stories/components/Calendar/Calendar.tsx';
import { FoodOutputDto } from '../../../types/FoodDto.ts';
import { useMemo, useRef } from 'react';
import { useCalendarCell } from 'react-aria';
import { isEqual } from 'date-fns';
import { getCellStyle } from '../utils/getCellStyle.ts';

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
                className={`calendar-cell ${isSelected ? 'selected' : ''} ${
                    isDisabled ? 'disabled' : ''
                } ${isUnavailable ? 'unavailable' : ''}`}
                style={getCellStyle(
                    value,
                    target_min,
                    target_max,
                    isSelected,
                    colorblind
                )}>
                {formattedDate}
            </div>
        </td>
    );
}
