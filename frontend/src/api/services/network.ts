import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { storageKeys } from '../../constants/storageKeys.ts';

const axiosConfig: CreateAxiosDefaults = {
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
};

const instance = axios.create(axiosConfig);
const authInstance = axios.create(axiosConfig);

authInstance.interceptors.request.use(
    (axiosRequest) => {
        const accessToken = localStorage.getItem(storageKeys.accessToken);
        if (accessToken) {
            axiosRequest.headers.Authorization = `Bearer ${accessToken.split('"')[1]}`;
        }
        return axiosRequest;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function request(config: AxiosRequestConfig) {
    return instance.request(config).then((response) => response.data);
}

export async function authRequest(config: AxiosRequestConfig) {
    return authInstance.request(config).then((response) => response.data);
}
