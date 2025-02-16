export interface FoodOutputDto {
    date: string;
    calories: number;
    name: string;
    id: string;
    userId: string;
}

export interface FoodInputDto {
    id: string;
    date: string;
    calories: number;
    name: string;
}
