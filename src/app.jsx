import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import { Auth } from "./utils/auth";

export default function App() {
  const [route, setRoute] = useState("landing");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = Auth.getUser();
    if (u) {
      setUser(u);
      setRoute("home");
    }
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setRoute("home");
  };

  const handleLogout = () => {
    Auth.logout();
    setUser(null);
    setRoute("landing");
  };

  return (
    <div>
      <Header onLogout={handleLogout} user={user} />
      {route === "landing" && <Landing onGetStarted={() => setRoute("auth")} />}
      {route === "auth" && <AuthPage onLogin={handleLogin} />}
      {route === "home" && <Home user={user} />}
    </div>
  );
}
