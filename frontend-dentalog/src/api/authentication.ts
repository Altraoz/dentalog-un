// api.ts
import axios from "axios";
import type { AxiosInstance } from "axios";
import { url_backend } from "./variables";

// Crea una instancia de Axios
const api: AxiosInstance = axios.create({
  baseURL: url_backend,
  withCredentials: true,
});

// Función para configurar el interceptor con logout
export const configureAxiosInterceptor = (logout: () => void) => {
  api.interceptors.response.use(
    (response) => response, // Respuesta exitosa, no hacer nada
    (error) => {
      if (error.response?.status === 401) {
        console.error("No autorizado: Sesión expirada o token inválido");
        logout(); // Ejecuta logout
      }
      return Promise.reject(error);
    }
  );
};

export default api;
