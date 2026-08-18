import { createContext, useEffect, useState } from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [credits, setCredits] = useState(5);
  const [loginVisibility, setLoginVisibility] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const fetchCredits = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/user/credits`,
        {},
        {
          headers: { token },
        },
      );

      // console.log(res);
      setCredits(res.data.credits);
      setUser(res.data.user);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request cancelled");
      } else {
        console.error(err);
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  const genImage = async (prompt) => {
    try {
      let res = await axios.post(
        `${backendURL}/image/generate`,
        { prompt },
        {
          headers: { token },
        },
      );

      if (res.status === 200) {
        fetchCredits();
        console.log(res, prompt);
        toast.success("Image generated successfully");
        return res.data.image;
      } else {
        toast.error("Image generation failed!");
        if (credits === 0) {
          navigate("/buy");
        }
      }
    } catch (err) {
      toast.error("Image generation failed!");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCredits();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    credits,
    setCredits,
    setLoginVisibility,
    loginVisibility,
    backendURL,
    token,
    setToken,
    fetchCredits,
    logout,
    genImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
