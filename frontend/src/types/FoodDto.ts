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

export interface WeeklyFoodInputDto {
    date: string;
}

export interface WeeklyFoodOutputDto {
    weeklyCalories: number;
    weeklyTarget: number;
}
