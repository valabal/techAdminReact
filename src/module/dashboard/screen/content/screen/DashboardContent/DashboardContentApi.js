import axios from "axios";

const api = axios.create({
  timeout: 10000,
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getContentData = () => {
  return api.get(`/users/`);
};
