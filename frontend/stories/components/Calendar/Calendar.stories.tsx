import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, CalendarCellProps } from './Calendar.tsx';
import { useNongulaCalendarState } from './useNongulaCalendarState.tsx';
import { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { useCalendarCell } from 'react-aria';
import { isEqual } from 'date-fns';
import { FoodOutputDto } from '../../../src/types/FoodDto.ts';
import { CalendarDate } from '@internationalized/date';

const meta: Meta<typeof Calendar> = {
    component: Calendar,
    title: 'Calendar',
};

export default meta;
type Story = StoryObj<typeof meta>;

function getBackground(
    value: number,
    min: number,
    max: number,
    colorblind?: boolean
) {
    if (value < 0.2) {
        return {
            backgroundColor: '#ffffff',
        };
    } else if (value < min) {
        if (colorblind) {
            return {
                backgroundColor: '#bcba29',
                opacity: 0.8,
                backgroundImage:
                    'linear-gradient(0deg, #bcba29 50%, #717019 50%)',
                backgroundSize: '8px 8px',
            };
        }
        return {
            backgroundColor: '#bcba29',
        };
    } else if (value < max) {
        if (colorblind) {
            return {
                backgroundColor: '#008537',
                opacity: 0.8,
                backgroundImage:
                    'linear-gradient(135deg, #005021 25%, transparent 25%), linear-gradient(225deg, #005021 25%, transparent 25%), linear-gradient(45deg, #005021 25%, transparent 25%), linear-gradient(315deg, #005021 25%, #008537 25%)',
                backgroundPosition: '8px 0, 8px 0, 0 0, 0 0',
                backgroundSize: '16px 16px',
                backgroundRepeat: 'repeat',
            };
        }
        return {
            backgroundColor: '#008537',
        };
    }
    if (colorblind) {
        return {
            backgroundColor: '#c23b26',
            opacity: 0.8,
            backgroundImage:
                'repeating-linear-gradient(45deg, #742317 25%, transparent 25%, transparent 75%, #742317 75%, #742317), repeating-linear-gradient(45deg, #742317 25%, #c23b26 25%, #c23b26 75%, #742317 75%, #742317)',
            backgroundPosition: '0 0, 8px 8px',
            backgroundSize: '16px 16px',
        };
    }
    return {
        backgroundColor: '#c23b26',
    };
}

function getCellStyle(
    value: number,
    min: number,
    max: number,
    isSelected: boolean,
    colorblind?: boolean
): CSSProperties {
    if (value) {
        return {
            ...getBackground(value, min, max, colorblind),
            outline: isSelected ? '4px solid black' : 'none',
        };
    }

    return { outline: isSelected ? '4px solid black' : 'none' };
}

interface ExampleCalendarCellProps<T> extends CalendarCellProps<T> {
    target_min: number;
    target_max: number;
    colorblind?: boolean;
}

function ExampleCalendarCell<T extends Omit<FoodOutputDto, 'userId'>>({
    state,
    date,
    data,
    target_min,
    target_max,
    colorblind,
}: ExampleCalendarCellProps<T>) {
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

const exampleData = [
    { date: '2025-01-01', calories: 150, name: 'Chicken', id: '1' },
    { date: '2025-01-02', calories: 260, name: 'Salad', id: '2' },
    { date: '2025-01-03', calories: 340, name: 'Burger', id: '3' },
    { date: '2025-01-04', calories: 450, name: 'Pizza', id: '4' },
    { date: '2025-01-05', calories: 560, name: 'Pasta', id: '5' },
    { date: '2025-01-06', calories: 600, name: 'Steak', id: '6' },
    { date: '2025-01-07', calories: 750, name: 'Sushi', id: '7' },
    { date: '2025-01-08', calories: 850, name: 'Tacos', id: '8' },
    { date: '2025-01-09', calories: 950, name: 'Burritos', id: '9' },
    { date: '2025-01-10', calories: 1150, name: 'Curry', id: '0' },
    { date: '2025-01-11', calories: 1250, name: 'Ramen', id: '11' },
    { date: '2025-01-12', calories: 1300, name: 'Lasagna', id: '12' },
    { date: '2025-01-13', calories: 1400, name: 'Fried Chicken', id: '13' },
    { date: '2025-01-14', calories: 1500, name: 'Fish and Chips', id: '13' },
    { date: '2025-01-15', calories: 1650, name: 'BBQ', id: '14' },
    { date: '2025-01-16', calories: 1750, name: 'Spaghetti', id: '15' },
    { date: '2025-01-17', calories: 1800, name: 'Hot Dogs', id: '16' },
    { date: '2025-01-18', calories: 1950, name: 'Cheeseburger', id: '17' },
    { date: '2025-01-19', calories: 2050, name: 'Fajitas', id: '18' },
    { date: '2025-01-20', calories: 2150, name: 'Chicken Wings', id: '19' },
    { date: '2025-01-21', calories: 2200, name: 'Peking Duck', id: '20' },
    { date: '2025-01-22', calories: 2300, name: 'Shawarma', id: '21' },
    { date: '2025-01-23', calories: 2400, name: 'Chili', id: '22' },
    { date: '2025-01-24', calories: 2500, name: 'Pork Belly', id: '23' },
    { date: '2025-01-25', calories: 2600, name: 'Lobster', id: '24' },
    { date: '2025-01-26', calories: 2700, name: 'Bacon', id: '25' },
    { date: '2025-01-27', calories: 2850, name: 'Ribs', id: '26' },
    { date: '2025-01-28', calories: 2900, name: 'Steak and Fries', id: '27' },
    { date: '2025-01-29', calories: 3000, name: 'Paella', id: '28' },
    { date: '2025-01-30', calories: 3100, name: 'Casserole', id: '29' },
];

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [state, locale] = useNongulaCalendarState();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            state.setFocusedDate(new CalendarDate(2025, 1, 15));
        }, []);

        return (
            <Calendar data={exampleData} state={state} locale={locale.locale}>
                {({ data, date, state, key }) => (
                    <ExampleCalendarCell
                        data={data}
                        date={date}
                        state={state}
                        target_min={2150}
                        target_max={2650}
                        key={key}
                    />
                )}
            </Calendar>
        );
    },
};

export const Colorblind: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [state, locale] = useNongulaCalendarState();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            state.setFocusedDate(new CalendarDate(2025, 1, 15));
        }, []);

        return (
            <Calendar data={exampleData} state={state} locale={locale.locale}>
                {({ data, date, state, key }) => (
                    <ExampleCalendarCell
                        data={data}
                        date={date}
                        state={state}
                        target_min={2150}
                        target_max={2650}
                        key={key}
                        colorblind={true}
                    />
                )}
            </Calendar>
        );
    },
};
