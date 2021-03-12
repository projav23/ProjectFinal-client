import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const allShoppingList = (spaceId) => authApi.get(`/${spaceId}/shoppinglist`);
export const newItemList = (spaceId, item) => authApi.post(`/${spaceId}/shoppinglist/newshoppinglist`, item);
