import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const authenticate = (token) => {
    setToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("token");
  };

  const value = {
    token: token,
    isAuthenticated: !!token,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthContextProvider;
