import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useLoading } from "./LoadingContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(() => !!localStorage.getItem("token"));
  const [ user, setUser ] = useState(null);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  useEffect(()=> {
    const getUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          const userData = await api.get("/auth/profile");
          setUser(userData.data);
        }
      } catch (err) {
        console.error("Fetching profile failed:", err);
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    };

    getUser();
  }, [isLoggedIn]);

  const login = async (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    showLoading();
    try {
      const res = await api.post("/auth/logout");
      if (res.status === 200) {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
