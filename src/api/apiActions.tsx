import axios from "axios";
import { api } from "./api";

const authApiUrl = `https://${process.env.REACT_APP_ENV}-auth.${process.env.REACT_APP_URL_API}`;
const userApiUrl = `https://${process.env.REACT_APP_ENV}-users.${process.env.REACT_APP_URL_API}`;

export const apiUser = async (params: any = {}) => {
  try {
    return await api.get(`${userApiUrl}/users`, params);
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
    return e;
  }
};

export const apiAuth = async (params: any = {}) => {
  try {
    return await api.post(`${authApiUrl}/auth/login`, params);
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
    return e;
  }
};
