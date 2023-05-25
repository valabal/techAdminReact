import { api } from "../../bootstrap/bootstrapApi";

export const loginUser = (payload) => {
  return api.post("/login", payload);
};

export const register = (payload) => {
  return api.post("/register", payload);
};
