import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { users } from "./data/userData";

// Pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleSignup = (newUser) => {
    // In a real app, we would add the user to the database
    // For now, we'll just simulate successful signup
    setCurrentUser({
      ...newUser,
      id: users.length + 1,
      balance: 1000,
      transactions: [],
      monthlySummary: Array(12)
        .fill()
        .map((_, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          balance: 1000,
        })),
      investments: [],
    });
    setIsAuthenticated(true);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Signup onSignup={handleSignup} />
          )
        }
      />
      <Route
        path="/home/*"
        element={
          isAuthenticated ? (
            <Home user={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
