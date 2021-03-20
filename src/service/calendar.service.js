import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const allEvents = (spaceId) => authApi.get(`/${spaceId}/calendar`);
export const getEvent = (spaceId, eventId) => authApi.get(`/${spaceId}/calendar/${eventId}`)
export const newEvent = (spaceId, event) => authApi.post(`/${spaceId}/calendar`, event);
export const deleteEvent = (spaceId, eventId) => authApi.delete(`/${spaceId}/calendar/${eventId}`);

