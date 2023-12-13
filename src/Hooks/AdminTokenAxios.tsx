import Axios from "axios";

const adminTokenAxios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminTokenAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminTokenAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    console.log("server error " + error);
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin");
      window.location.reload();
    }
    // originalRequest._retry = true;
    return error.response;
  }
);
export default adminTokenAxios;
