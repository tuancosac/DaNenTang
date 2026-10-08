import axios from "axios";

const API_URL = 'http://192.168.1.21:3000';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface LoginResponse {
    message: string;
    accessToken: string;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/auth/login', {
            email: email,
            password: password,
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Failed connected to server'};
    }
}