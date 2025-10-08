import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken || null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const isLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const markProfileCompletedHandler = () => {
    setProfileCompleted(true);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const authContext = {
    token,
    isLoggedIn,
    profileCompleted,
    emailVerified,
    setEmailVerified,
    login: loginHandler,
    logout: logoutHandler,
    markProfileCompleted: markProfileCompletedHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
