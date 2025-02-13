export interface LoginInputDto {
    email: string;
    password: string;
}

export interface LoginOuputDto {
    token: string;
    id: string;
    email: string;
}
