import { api } from "bootstrap/bootstrapApi";

export const getUsers = (page) => {
  return api.get(`/users?page=${page}`);
};

export const deleteUsers = (userId) => {
  return api.delete(`/users/${userId}`);
};

export const getUser = (userId) => {
  return api.get(`/users/${userId}`);
};

export const editUser = ({ id, param }) => {
  return api.put(`/users/${id}`, param);
};

export const createUser = (param) => {
  return api.post(`/users/`, param);
};
