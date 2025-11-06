import React from "react";
import "../styles/welcomeComponent.css";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import TimeDate from "./TimeDate";
const WelcomeComponent = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/LoginPage");
   
  };

  return (
    <div className="welcome_container">
      <h1>
        Welcome <span>{user.name}</span>
      </h1>
      <TimeDate/>
      <div className="buttons">
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomeComponent;
