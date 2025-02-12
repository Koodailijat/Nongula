import { request } from './request.ts';
import { QueryFunctionContext } from '@tanstack/react-query';

interface FoodItem {
    id: number;
    name: {
        fi: string;
        en: string;
    };
    energyKcal: number;
}

export function getFoodItems({
    queryKey,
}: QueryFunctionContext<[string, string]>): Promise<FoodItem[]> {
    const search = queryKey.splice(1)[0];

    return request({
        url: `https://fineli.fi/fineli/api/v1/foods?q=${search}`,
        method: 'get',
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
