import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants/queryKeys.ts';
import { getStreak } from '../services/streakService.ts';

export function useStreakQuery() {
    return useQuery({
        queryKey: [queryKeys.user],
        queryFn: getStreak,
    });
}
