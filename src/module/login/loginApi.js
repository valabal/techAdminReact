import { api } from "../../bootstrap/bootstrapApi";
import axios from "axios";

export const loginUser = (payload) => {
  return api.post("/login", payload);
};

export const register = (payload) => {
  return api.post("/register", payload);
};
