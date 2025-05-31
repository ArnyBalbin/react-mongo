import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const obtenerProductos = () => axios.get(`${API}/api/productos`);
export const obtenerProducto = (id) => axios.get(`${API}/api/productos/${id}`);
export const crearProducto = (data) => axios.post(`${API}/api/productos`, data);
export const actualizarProducto = (id, data) => axios.put(`${API}/api/productos/${id}`, data);
export const eliminarProducto = (id) => axios.delete(`${API}/api/productos/${id}`);
