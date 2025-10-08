import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  profileCompleted: false,
  emailVerified: false,
  setEmailVerified: false,
  login: (token, email) => {},
  logout: () => {},
  markProfileCompleted: () => {},
});

export default AuthContext;
