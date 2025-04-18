import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToDoList from "./components/ToDoList";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/Navbar";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yzrzocbvxyeglpamjosw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cnpvY2J2eHllZ2xwYW1qb3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTE4ODIsImV4cCI6MjA1OTc4Nzg4Mn0.oeBICtptnPocMlH0iEi28KcmMaKao6LMnaPxfIUSVEw";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <NavBar user={user} supabase={supabase} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/todolist" /> : <Login supabase={supabase} />
            }
          ></Route>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/todolist" /> : <Login supabase={supabase} />
            }
          ></Route>
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/todolist" />
              ) : (
                <Register supabase={supabase} />
              )
            }
          ></Route>
          <Route
            path="/todolist"
            element={
              user ? (
                <ToDoList supabase={supabase} user={user} />
              ) : (
                <Navigate to="/Login" supabase={supabase} />
              )
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
