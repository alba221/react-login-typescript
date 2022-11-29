import axios from "axios";

const BASE_GET_URL = "https://dev-auth.wemission.community";
const BASE_POST_URL = "https://dev-auth.wemission.community/v1/api";
const HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiGet = async (url: string) => {
  try {
    return await axios.get(`${BASE_GET_URL}${url}`, HEADERS);
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response;
    }
    return e;
  }
};

export const apiPost = async (url: string, data: any) => {
  try {
    return await axios.post(`${BASE_POST_URL}${url}`, data, HEADERS);
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
    return e;
  }
};
