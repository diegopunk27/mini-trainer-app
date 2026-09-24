import axios from 'axios';

const ROUTE = import.meta.env.VITE_API_URL ?? '';
const headers = {
  // establecer headers de autorización
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    /* Manejo de errores*/
    return Promise.reject(error);
  },
);

export const getData = async (url: string, element = '') => {
  const response = await axios.get(ROUTE + url + element, { headers });
  return response.statusText === 'OK' ? response.data : null;
};

export const putData = async <BodyType>(url: string, body: BodyType) => {
  const response = await axios.put(ROUTE + url, body, { headers });
  return response.statusText === 'OK' ? response.data : null;
};

export const postData = async <BodyType>(url: string, body: BodyType) => {
  const response = await axios.post(ROUTE + url, body, { headers });
  return response.statusText === 'OK' ? response.data : null;
};

export const deleteData = async (url: string) => {
  const response = await axios.delete(ROUTE + url, { headers });
  return response.statusText === 'OK' ? response.data : null;
};

export const patchData = async <BodyType>(url: string, body: BodyType) => {
  const response = await axios.patch(ROUTE + url, body, { headers });
  return response.statusText === 'OK' ? response.data : null;
};
