import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userType: "",
  login: (data) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const intialUserType = localStorage.getItem("userType");
  const [token, setToken] = useState(initialToken);
  const [_userType, setUserType] = useState(intialUserType);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (data) => {
    setToken(data.token);
    setUserType(data.UserType);
    localStorage.setItem("userType", data.userType);
    localStorage.setItem("token", data.token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userType: _userType,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const UserTypeS = {
  CNCUSER: "CNCUSER",
  TEXUSER: "TEXUSER",
  STAMPUSER: "STAMPUSER",
  PIUSER: "STAMPUSER",
};

export default AuthContext;
