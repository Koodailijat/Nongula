import {
    Button as RAButton,
    Heading as RAHeading,
    CalendarProps as RACalendarProps,
    CalendarCellProps as RACalendarCellProps,
    Key,
} from 'react-aria-components';
import { useCalendar, useCalendarGrid } from 'react-aria';
import { getWeeksInMonth } from '@internationalized/date';
import { ReactNode } from 'react';
import { CalendarState } from 'react-stately';
import { DateValue } from '@react-types/datepicker';

export interface CalendarCellProps<T> extends RACalendarCellProps {
    state: CalendarState;
    key: Key;
    data: T[];
}

interface CalendarProps<TData> extends Omit<RACalendarProps<DateValue>, 'children'> {
    data: TData[];
    state: CalendarState;
    locale: string;
    children: (props: CalendarCellProps<TData>) => ReactNode;
}

export function Calendar<TData>({ data, state, locale, children, ...props }: CalendarProps<TData>) {
    const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);
    const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);
    const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale, props.firstDayOfWeek);

    return (
        <div {...calendarProps} className="calendar">
            <header className="calendar-header">
                <RAButton {...prevButtonProps} className="calendar-button">
                    ◀
                </RAButton>
                <RAHeading className="calendar-heading">{title}</RAHeading>
                <RAButton {...nextButtonProps} className="calendar-button">
                    ▶
                </RAButton>
            </header>
            <table {...gridProps}>
                <thead {...headerProps}>
                    <tr>
                        {weekDays.map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
                        <tr key={weekIndex}>
                            {state.getDatesInWeek(weekIndex).map((date, i) =>
                                date ? (
                                    children({
                                        key: date.toString(),
                                        state,
                                        date,
                                        data,
                                    })
                                ) : (
                                    <td key={i} />
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
