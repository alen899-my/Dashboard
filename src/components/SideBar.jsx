import React from "react";
import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar_container">
      <h1>Admin</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
