import React from "react";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { useAuth } from "./contexts/AuthContext";
import "./firebase";

function App() {
  const { user } = useAuth();
  console.log("user", user);
  return <>{user ? <Homepage /> : <Login />}</>;
}

export default App;
