import React from "react";
import Themes from "./themes/Themes";
import dark from "../images/dark.png";
import light from "../images/light.png";
import "../styles/ThemeToggleButton.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = Themes();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
      <img
        src={theme === "light" ? dark : light}
        alt={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        className="theme-icon"
      />
    </button>
  );
};

export default ThemeToggleButton;
