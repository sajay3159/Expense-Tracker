import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  profileCompleted: false,
  login: (token, email) => {},
  logout: () => {},
  markProfileCompleted: () => {},
});

export default AuthContext;
