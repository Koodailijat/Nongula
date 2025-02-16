import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { CircularProgressBar } from '../../../stories/components/CircularProgressBar/CircularProgressBar.tsx';
import { Calendar } from '../../../stories/components/Calendar/Calendar.tsx';
import { Button } from '../../../stories/components/Button/Button.tsx';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { format, formatISO } from 'date-fns';
import { useMemo, useState } from 'react';
import { useNongulaCalendarState } from '../../../stories/components/Calendar/useNongulaCalendarState.tsx';
import { useSelectedDate } from '../../../stories/components/Calendar/useSelectedDate.tsx';
import { getCellStyle } from './utils/getCellStyle.ts';
import { Streak } from './components/Streak.tsx';
import { ChangeTargetCaloriesModal } from './components/ChangeTargetCaloriesModal.tsx';
import { useUserQuery } from '../../api/queries/userQueries.tsx';
import { useFoodsQuery } from '../../api/queries/foodQueries.tsx';
import { useCurrentDayCalories } from '../../hooks/useCurrentDayCalories.tsx';
import { getVisibleRange } from './utils/getVisibleRange.ts';

export function DashboardRoute() {
    const navigate = useNavigate();
    const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
    const [calendarState, locale] = useNongulaCalendarState();
    const selectedDate = useSelectedDate(calendarState);
    const ISODate = useMemo(
        () => formatISO(selectedDate.toString(), { representation: 'date' }),
        [selectedDate]
    );
    const userQuery = useUserQuery();
    const foodsQuery = useFoodsQuery(
        getVisibleRange(calendarState.visibleRange)
    );
    const currentDayCalories = useCurrentDayCalories(ISODate, foodsQuery.data);

    const targetCalories = useMemo(
        () =>
            userQuery.data?.target_calories
                ? userQuery.data.target_calories
                : 0,
        [userQuery.data]
    );

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <Heading level={1}>{format(selectedDate, 'LLLL do')}</Heading>
                <Streak />
            </div>
            <div className="dashboard__content">
                <CircularProgressBar
                    value={currentDayCalories}
                    heading="Calories"
                    isLoading={userQuery.isLoading}
                    target={targetCalories}
                />
                <Calendar
                    data={foodsQuery.data ? foodsQuery.data : []}
                    targetCalories={targetCalories}
                    state={calendarState}
                    locale={locale.locale}
                    firstDayOfWeek="mon"
                    cellStyleFn={getCellStyle}
                />
                <div className="dashboard__button-container">
                    <Button
                        onPress={() => navigate(`/modify/${ISODate}`)}
                        icon={<PlusIcon size="16" />}>
                        Add calories
                    </Button>
                    <Button
                        variant="secondary"
                        onPress={() => setIsTargetModalOpen(true)}>
                        Change target
                    </Button>
                </div>
            </div>
            <ChangeTargetCaloriesModal
                isOpen={isTargetModalOpen}
                setIsOpen={setIsTargetModalOpen}
            />
        </div>
    );
}
