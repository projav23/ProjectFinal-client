import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/spaces`,
  withCredentials: true,
});

export const documentsAll = (spaceId) => authApi.get(`/${spaceId}/documents`);
export const newDocument = (spaceId, document) => authApi.post(`/${spaceId}/documents/newdocument`, document);
export const getFile = (spaceId, file) => authApi.post(`/${spaceId}/documents/newdocument/upload`, file)
export const deleteDocument = (spaceId, documentId) => authApi.delete(`/${spaceId}/documents/${documentId}`);

