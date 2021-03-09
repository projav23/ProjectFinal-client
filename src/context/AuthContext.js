import React from "react";
import { login, logout, signup } from "../service/auth.service";

export const AuthContext = React.createContext({});

const initialState = {
  isLogged: localStorage.getItem("isLogged"),
  user: localStorage.getItem('user')
};

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(initialState);

  // const handleLogin = React.useCallback(async (user) => {
  //   try {
  //     const { data: loggedUser } = await login(user);
  //     saveUser(loggedUser);
  //     setState({ user: { ...loggedUser, isLogged: true } });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  // const handleSignup = React.useCallback(async (user) => {
  //   try {
  //     const { data: loggedUser } = await signup(user);
  //     saveUser(loggedUser);
  //     setState({ user: { ...loggedUser, isLogged: true } });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  // const handleLogout = React.useCallback(async () => {
  //   try {
  //     await logout();
  //     removeUser();
  //     setState({ user: defaultUser() });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
