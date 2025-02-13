import { mutationKeys } from '../../constants/mutationKeys.ts';
import { loginRequest, signUpRequest } from '../services/authRequest.ts';
import { useMutation } from '@tanstack/react-query';
import { useAuthLocalStorage } from '../../hooks/useAuthLocalStorage.tsx';

export function useLoginMutation() {
    const [, setAuthState] = useAuthLocalStorage();
    return useMutation({
        mutationFn: loginRequest,
        mutationKey: [mutationKeys.login],
        onSuccess: (data) => {
            setAuthState(data.token);
        },
    });
}

export function useSignUpMutation() {
    return useMutation({
        mutationFn: signUpRequest,
        mutationKey: [mutationKeys.singup],
    });
}
