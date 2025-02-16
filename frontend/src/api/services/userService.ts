import { authRequest } from './network.ts';
import { UserInputDto, UserOutputDto } from '../../types/UserDto.ts';

export async function getUser(): Promise<UserOutputDto> {
    return authRequest({
        method: 'GET',
        url: 'api/user',
    });
}

export async function postUser(args: UserInputDto): Promise<UserOutputDto> {
    return authRequest({
        method: 'POST',
        url: 'api/user',
        data: args,
    });
}
