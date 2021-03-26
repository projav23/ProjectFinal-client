import React from "react";


export const AuthContext = React.createContext({});

const initialState = {
  isLogged: localStorage.getItem("isLogged"),
  user: localStorage.getItem('user')
};

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(initialState);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
