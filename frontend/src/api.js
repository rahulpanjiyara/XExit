import axios from "axios";

const API = axios.create({
  baseURL: "https://xexit-5qgl.onrender.com/api", // API URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
