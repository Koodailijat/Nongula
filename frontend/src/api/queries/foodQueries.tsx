import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import { mutationKeys } from '../../constants/mutationKeys.ts';
import {
    deleteFood,
    getFoods,
    getWeeklyFoods,
    postFood,
    putFood,
} from '../services/foodService.ts';
import { queryKeys } from '../../constants/queryKeys.ts';
import { toastQueue } from '../../../stories/components/Toast/GlobalToastRegion.tsx';
import { queryClient } from './queryClient.ts';
import { WeeklyFoodInputDto } from '../../types/FoodDto.ts';

export function useFoodsQuery({
    startDate,
    endDate,
}: {
    startDate: string;
    endDate?: string;
}) {
    return useQuery({
        queryFn: startDate ? () => getFoods({ startDate, endDate }) : skipToken,
        queryKey: [queryKeys.food, startDate, endDate],
    });
}

export function useWeeklyFoodsQuery({ date }: WeeklyFoodInputDto) {
    return useQuery({
        queryFn: date ? () => getWeeklyFoods({ date }) : skipToken,
        queryKey: [queryKeys.food, date],
    });
}

export function useFoodModifyMutation() {
    return useMutation({
        mutationFn: putFood,
        mutationKey: [mutationKeys.food],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.food] });
            toastQueue.add(
                { element: 'Food updated', severity: 'success' },
                { timeout: 5000 }
            );
        },
    });
}

export function useFoodMutation() {
    return useMutation({
        mutationFn: postFood,
        mutationKey: [mutationKeys.food],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.food] });
            toastQueue.add(
                { element: 'Food added', severity: 'success' },
                { timeout: 5000 }
            );
        },
    });
}

export function useFoodDeleteMutation() {
    return useMutation({
        mutationFn: deleteFood,
        mutationKey: [mutationKeys.food],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.food] });
        },
    });
}
