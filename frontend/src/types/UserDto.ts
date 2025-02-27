export interface UserInputDto {
    target_calories: number;
}

export interface UserOutputDto {
    id: string;
    email: string;
    target_calories_min: number;
    target_calories_max?: number;
}
