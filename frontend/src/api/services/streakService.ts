import { authRequest } from './network.ts';
import { StreakDto } from '../../types/StreakDto.ts';

export async function getStreak(): Promise<StreakDto> {
    return authRequest({
        method: 'GET',
        url: 'api/user/streak',
    });
}
