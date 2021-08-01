import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout(email, password) {
    console.log("logout");
    return auth.signOut();
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      console.log("onAuthChanged");
      setUser(user);
    });
    return unsub;
  }, []);
  const value = { user, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
