import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationKeys } from '../../constants/mutationKeys.ts';
import { getUser, postUser } from '../services/userService.ts';
import { queryKeys } from '../../constants/queryKeys.ts';
import { queryClient } from './queryClient.ts';

export function useUserQuery() {
    return useQuery({
        queryKey: [queryKeys.user],
        queryFn: getUser,
    });
}

export function useUserMutation() {
    return useMutation({
        mutationFn: postUser,
        mutationKey: [mutationKeys.user],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
        },
    });
}
