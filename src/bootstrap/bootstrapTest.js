import axios from "axios";

const axiosLiveInstance = axios.create({
  timeout: 10000,
  baseURL: "test",
  //   params: {
  //     apikey: API_KEY,
  //   },
});

export const apiTest = axiosLiveInstance;
