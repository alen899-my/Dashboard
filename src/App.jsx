import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashBoard from "./pages/AdminDashBoard";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import AdminHome from "./pages/AdminHome";
import Settings from "./pages/Settings";
import "./styles/App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); 
  }, []);

 
  if (loading) {
    return <div className="text-center mt-10 text-lg"></div>;
  }

  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={user ? <Navigate to="/admin/home" /> : <LoginPage />}
      />

      {/* Auth routes */}
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/SignupPage" element={<SignupPage />} />

      {/* Admin layout route */}
      <Route path="/admin" element={<AdminDashBoard />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
