import { request } from './network.ts';

interface FineliFoodItem {
    id: number;
    name: {
        fi: string;
        en: string;
    };
    energyKcal: number;
}

export function getFoodItems(search: string): Promise<FineliFoodItem[]> {
    return request({
        url: `https://fineli.fi/fineli/api/v1/foods?q=${search}`,
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
