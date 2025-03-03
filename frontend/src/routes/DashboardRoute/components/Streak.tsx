import { useMemo } from 'react';
import { Badge } from '../../../../stories/components/Badge/Badge.tsx';
import { useStreakQuery } from '../../../api/queries/userQueries.tsx';

export function Streak() {
    const streakQuery = useStreakQuery();

    const streakCount = useMemo(
        () =>
            streakQuery.data?.streakCount ? streakQuery.data.streakCount : 0,
        [streakQuery.data]
    );

    return <>{streakCount > 2 && <Badge>{streakCount}🔥</Badge>}</>;
}
