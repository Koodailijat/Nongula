import { RangeValue } from '@react-types/shared';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import { formatISO } from 'date-fns';

export function getVisibleRange(visibleRange: RangeValue<CalendarDate>) {
    return {
        startDate: formatISO(visibleRange.start.toDate(getLocalTimeZone()), {
            representation: 'date',
        }),
        endDate: formatISO(visibleRange.end.toDate(getLocalTimeZone()), {
            representation: 'date',
        }),
    };
}
