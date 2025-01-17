import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const allSpaces = () => authApi.get("/");
export const findSpace = (spaceId) => authApi.get(`/${spaceId}`);
export const editSpace = (spaceId, space) => authApi.post(`/${spaceId}/edit`, space);
export const newSpace = (space) => authApi.post("/new", space);
export const getUsers = () => authApi.get("/new");
export const getFile = (file) => authApi.post('/new/upload', file)
// export const deleteUserSpace = (id) => authApi.post('')
export const deleteSpaceOne = (spaceId) => authApi.delete(`/${spaceId}`)


