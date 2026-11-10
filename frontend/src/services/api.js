import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getProducts = (params) => api.get("/products", { params });
export const getProduct = (id) => api.get(`/products/${id}`);

export default api;