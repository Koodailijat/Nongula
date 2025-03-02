import { UserOutputDto } from '../../types/UserDto.ts';
import { authRequest } from './network.ts';
import { SetupInputDto } from '../../types/SetupDto.ts';

export async function postSetup(args: SetupInputDto): Promise<UserOutputDto> {
    return authRequest({
        method: 'POST',
        url: 'api/setup',
        data: args,
    });
}
