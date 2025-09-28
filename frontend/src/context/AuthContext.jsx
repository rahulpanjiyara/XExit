import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
  try {
    const { data } = await API.post("/auth/login", { username, password });

    localStorage.setItem("token", data.token);

    const role = username === "admin" ? "admin" : "employee";

    setUser({ username, role });
   

    // ✅ Navigate based on role
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};


  const register = async (username, password) => {
    try {
      const { data } = await API.post("/auth/register", { username, password });
      toast.success(data.message || "User registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
   
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
