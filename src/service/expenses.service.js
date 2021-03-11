import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const expensesAll = (spaceId) => authApi.get(`/${spaceId}/expenses`);
export const newExpense = (spaceId, expense) => authApi.post(`/${spaceId}/expenses/newexpense`, expense);
