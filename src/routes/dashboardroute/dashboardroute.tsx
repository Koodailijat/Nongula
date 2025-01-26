import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { Badge } from '../../../stories/components/Badge/Badge.tsx';
import './dashboardroute.scss';
import { Text } from '../../../stories/components/Text/Text.tsx';
import { CircularProgressBar } from '../../../stories/components/CircularProgressBar/CircularProgressBar.tsx';
import { Calendar } from '../../../stories/components/Calendar/Calendar.tsx';
import { Button } from '../../../stories/components/Button/Button.tsx';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { format, formatISO } from 'date-fns';
import { useNutritionLocalStorage } from '../../hooks/usenutritionlocalstorage.tsx';
import { useTargetCaloriesLocalStorage } from '../../hooks/usetargetcalorieslocalstorage.tsx';
import { useMemo, useState } from 'react';
import { useCurrentDayCalories } from '../../hooks/usecurrentdaycalories.tsx';

export function DashboardRoute() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const ISODate = useMemo(
        () => formatISO(selectedDate, { representation: 'date' }),
        [selectedDate]
    );
    const navigate = useNavigate();
    const [nutrition] = useNutritionLocalStorage();
    const [targetCalories] = useTargetCaloriesLocalStorage();
    const currentDayCalories = useCurrentDayCalories(ISODate, nutrition);

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <Heading level={1}>{format(selectedDate, 'LLLL do')}</Heading>
                <Badge>
                    <Text mode="secondary" size="large">
                        4 🔥
                    </Text>
                </Badge>
            </div>
            <div className="dashboard__content">
                <CircularProgressBar
                    value={currentDayCalories}
                    heading="Calories"
                    target={targetCalories}
                />
                <Calendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    data={nutrition}
                    target_calories={2100}
                />
                <Button
                    size="large"
                    onPress={() => navigate(`/modify/${ISODate}`)}
                    icon={<PlusIcon size="16" />}>
                    Add calories
                </Button>
            </div>
        </div>
    );
}
