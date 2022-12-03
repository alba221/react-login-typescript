import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../app/store/sessionManager";

const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  get: async (url: string, params: any) => {
    try {
      return await apiClient.get(url, params);
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        console.log("Unexpected error: ", e);
      }
    }
  },
  post: async (url: string, params: any) => {
    try {
      return await apiClient.post(url, params);
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        console.log("Unexpected error: ", e);
      }
    }
  },
};
