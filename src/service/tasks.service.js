import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const tasksAll = (spaceId) => authApi.get(`/${spaceId}/tasks`);
export const newTask = (spaceId, task) => authApi.post(`/${spaceId}/newTask`, task);
