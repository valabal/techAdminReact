import axios from "axios";
import { BASE_URL } from "util/constant";

const axiosLiveInstance = axios.create({
  timeout: 10000,
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //   params: {
  //     apikey: API_KEY,
  //   },
});

export const api = axiosLiveInstance;

api.interceptors.request.use((request) => {
  console.log(">>> Request", request);
  return request;
});

api.interceptors.response.use(
  (response) => {
    console.log("<<< Response:", response);
    return response;
  },
  (error) => {
    console.log("*** ", error);
    return Promise.reject(error);
  }
);
