import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import '../styles/AdminDashboard.css';
import WelcomeComponent from '../components/WelcomeComponent';
import { Outlet } from 'react-router-dom';
import Themes from '../components/themes/Themes';
const AdminDashBoard = () => {

  const {theme}=Themes()
  useEffect(()=>{
    document.body.setAttribute("data-theme",theme)
  },[theme])
  return (
    <div className="admin_dashboard">
      <SideBar />
      <main className="dashboard_content">
        <WelcomeComponent/>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashBoard;
