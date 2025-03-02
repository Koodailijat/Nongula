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
import { Streak } from './components/Streak.tsx';
import { ChangeTargetCaloriesModal } from './components/ChangeTargetCaloriesModal.tsx';
import { useUserQuery } from '../../api/queries/userQueries.tsx';
import { useFoodsQuery } from '../../api/queries/foodQueries.tsx';
import { useCurrentDayCalories } from '../../hooks/useCurrentDayCalories.tsx';
import { getVisibleRange } from './utils/getVisibleRange.ts';
import { CustomCalendarCell } from './components/CustomCalendarCell.tsx';
import { useIsColorblindLocalStorage } from '../../hooks/useIsColorblindLocalStorage.tsx';
import { LogoutButton } from '../../components/LogoutButton.tsx';
import { TopNavigation } from '../../components/TopNavigation.tsx';
import { A11yToggleButton } from './components/A11yToggleButton.tsx';
import { useIsDesktopMode } from '../../hooks/useIsDesktopMode.tsx';

export function DashboardRoute() {
    const navigate = useNavigate();
    const isDesktopMode = useIsDesktopMode();
    const [isColorblind, setIsColorblind] = useIsColorblindLocalStorage();
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

    const targetCaloriesMin = useMemo(
        () =>
            userQuery.data?.target_calories_min
                ? userQuery.data.target_calories_min
                : 0,
        [userQuery.data]
    );
    const targetCaloriesMax = useMemo(
        () =>
            userQuery.data?.target_calories_max
                ? userQuery.data.target_calories_max
                : 0,
        [userQuery.data]
    );

    return (
        <div className="dashboard-route">
            <TopNavigation>
                <A11yToggleButton
                    isSelected={isColorblind}
                    onChange={setIsColorblind}
                />
                {isDesktopMode ? (
                    <div />
                ) : (
                    <div className="dashboard__header">
                        <Heading level={2}>
                            {format(selectedDate, 'LLLL do')}
                        </Heading>
                        <Streak />
                    </div>
                )}
                <LogoutButton />
            </TopNavigation>
            <div className="dashboard-route__container">
                {isDesktopMode ? (
                    <div className="dashboard__header">
                        <Heading level={1}>
                            {format(selectedDate, 'LLLL do')}
                        </Heading>
                        <Streak />
                    </div>
                ) : null}
                <div className="dashboard__content">
                    <div className="dashboard__widgets">
                        <CircularProgressBar
                            value={currentDayCalories}
                            heading="Calories"
                            isLoading={userQuery.isLoading}
                            target={targetCaloriesMin}
                            targetText={`${targetCaloriesMin}-${targetCaloriesMax}`}
                        />
                        <Calendar
                            data={foodsQuery.data ? foodsQuery.data : []}
                            state={calendarState}
                            locale={locale.locale}
                            firstDayOfWeek="mon">
                            {({ data, date, state, key }) => (
                                <CustomCalendarCell
                                    data={data}
                                    date={date}
                                    state={state}
                                    target_min={targetCaloriesMin}
                                    target_max={targetCaloriesMax}
                                    key={key}
                                    colorblind={isColorblind}
                                />
                            )}
                        </Calendar>
                    </div>
                    <div className="dashboard__buttons">
                        <Button
                            onPress={() => navigate(`/modify/${ISODate}`)}
                            icon={<PlusIcon size="16" />}>
                            Add calories
                        </Button>
                        <Button
                            variant="secondary"
                            onPress={() => setIsTargetModalOpen(true)}>
                            Change targets
                        </Button>
                    </div>
                </div>
                <ChangeTargetCaloriesModal
                    isOpen={isTargetModalOpen}
                    setIsOpen={setIsTargetModalOpen}
                />
            </div>
        </div>
    );
}
