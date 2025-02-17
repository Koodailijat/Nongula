import { CalendarCellProps } from '../../../../stories/components/Calendar/Calendar.tsx';
import { FoodOutputDto } from '../../../types/FoodDto.ts';
import { useMemo, useRef } from 'react';
import { useCalendarCell } from 'react-aria';
import { isEqual } from 'date-fns';
import { getCellStyle } from '../utils/getCellStyle.ts';

interface CustomCalendarCellProps<T> extends CalendarCellProps<T> {
    target: number;
}

export function CustomCalendarCell<T extends Omit<FoodOutputDto, 'userId'>>({
    state,
    date,
    data,
    target,
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

    const targetRatio = useMemo(
        () =>
            data
                .filter((food) => isEqual(food.date, date.toString()))
                .reduce(
                    (previousValue, currentValue) =>
                        previousValue + currentValue.calories,
                    0
                ) / target,
        [data, date, target]
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
                style={getCellStyle(targetRatio, isSelected)}>
                {formattedDate}
            </div>
        </td>
    );
}
