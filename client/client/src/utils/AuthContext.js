import React, { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const baseUrl = "http://localhost:5001";
  
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      setIsAuthenticated(true); // Set isAuthenticated to true if there is a token
      setAuthToken(jwtToken);
      try {
        const decoded = jwtDecode(jwtToken);
        setCurrentUser(decoded);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logoutUser();
        }
      } catch (error) {
        logoutUser();
      }
    }
  }, []);

  const registerUser = async (userData, navigate) => {
    try {
      // Register the user
      const registerResponse = await axios.post(
        `${baseUrl}/api/users/register`,
        userData
      );

      // If registration is successful, log in the user
      const loginResponse = await axios.post(`${baseUrl}/api/users/login`, {
        email: userData.email,
        password: userData.password,
      });

      // Extract token from login response
      const { token } = loginResponse.data;

      // Store token in local storage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("linkToken", '');
    
      // // Set the token in axios headers
      setAuthToken(token);

      // Decode the token and set the user
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);

        // Reset registration error on successful registration
        setRegistrationError(null);

      // Redirect to the desired page
      navigate("/dashboard");
      
    } catch (err) {
      console.log(err);
     setRegistrationError(err.response.data);
    }
  };


  const loginUser = async (userData) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, userData);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("linkToken", '');
      // localStorage.setItem("accounts", []);
      // localStorage.setItem("transactions", []);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    } catch (err) {
      if (err.response) {
        setLoginError(err.response.data);
      } else {
        // Handle other types of errors (e.g., network errors)
        console.error("An error occurred:", err);
      }
    }
  };

  const logoutUser = async (navigate) => {
    try {
      // Clear localStorage and remove Authorization header
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      // Redirect to landing page
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.log(err); 
    }
  };

  const setCurrentUser = (userData) => {
    setIsAuthenticated(!!Object.keys(userData).length);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        registrationError,
        registerUser,
        loginError,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext};
