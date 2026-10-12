import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const API_PORT = 3667;
const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "");

function getApiBaseUrl(): string {
  if (configuredApiUrl) {
    return configuredApiUrl;
  }

  if (Platform.OS === "web") {
    const hostname =
      typeof window !== "undefined" ? window.location.hostname : "localhost";
    return `http://${hostname}:${API_PORT}`;
  }

  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) {
    throw new Error(
      "Backend URL is not configured. Set EXPO_PUBLIC_API_URL to the backend URL.",
    );
  }

  const devServerUrl = new URL(
    hostUri.includes("://") ? hostUri : `http://${hostUri}`,
  );
  return `http://${devServerUrl.hostname}:${API_PORT}`;
}

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_TOKEN_KEY = "authToken";

export async function saveAuthToken(token: string): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") {
      throw new Error("Token storage is unavailable outside the browser.");
    }
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    return;
  }

  const SecureStore = await import("expo-secure-store");
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

export async function clearAuthToken(): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    return;
  }

  const SecureStore = await import("expo-secure-store");
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

apiClient.interceptors.request.use(async (config) => {
  const token =
    Platform.OS === "web"
      ? typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_TOKEN_KEY)
        : null
      : await (await import("expo-secure-store")).getItemAsync(AUTH_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export const loginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });
  await saveAuthToken(response.data.accessToken);
  return response.data;
};
