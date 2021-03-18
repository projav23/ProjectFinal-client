import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const choresAll = (spaceId) => authApi.get(`/${spaceId}/chores`);
export const newChore = (spaceId, chore) => authApi.post(`/${spaceId}/chores/newchore`, chore);
export const deleteChore = (spaceId, choreId) => authApi.delete(`/${spaceId}/chores/${choreId}`);

