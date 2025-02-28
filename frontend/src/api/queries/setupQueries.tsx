import { useMutation } from '@tanstack/react-query';
import { mutationKeys } from '../../constants/mutationKeys.ts';
import { postSetup } from '../services/setupService.ts';

export function useSetupMutation() {
    return useMutation({
        mutationFn: postSetup,
        mutationKey: [mutationKeys.setup],
    });
}
