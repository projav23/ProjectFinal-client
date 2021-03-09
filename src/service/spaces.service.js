import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const allSpaces = () => authApi.get("/");
export const findSpace = (spaceId) => authApi.get(`/${spaceId}`);
export const newSpace = (space) => authApi.post("/new", space);

