import { authRequest } from './network.ts';
import {
    FoodInputDto,
    FoodOutputDto,
    WeeklyFoodOutputDto,
} from '../../types/FoodDto.ts';

export async function getFoods({
    startDate,
    endDate,
}: {
    startDate: string;
    endDate?: string;
}): Promise<FoodOutputDto[]> {
    return authRequest({
        method: 'GET',
        url: 'api/foods',
        params: {
            startDate,
            endDate,
        },
    });
}

export async function getWeeklyFoods({
    date,
}: {
    date: string;
}): Promise<WeeklyFoodOutputDto> {
    return authRequest({
        method: 'GET',
        url: 'api/food/weekly',
        params: {
            date,
        },
    });
}

export async function postFood(
    args: Omit<FoodInputDto, 'id'>
): Promise<FoodOutputDto> {
    return authRequest({
        method: 'POST',
        url: 'api/food',
        data: args,
    });
}

export async function putFood(
    args: Omit<FoodInputDto, 'date'>
): Promise<FoodOutputDto> {
    return authRequest({
        method: 'PUT',
        url: 'api/food',
        data: args,
    });
}

export async function deleteFood({
    id,
}: Pick<FoodInputDto, 'id'>): Promise<void> {
    return authRequest({
        method: 'DELETE',
        url: `api/food/${id}`,
    });
}
