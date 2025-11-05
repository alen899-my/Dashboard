import React from "react";
import "../styles/Success.css";
import { Link } from "react-router-dom";

const SuccessLogin = ({ onClose }) => {
  return (
    <div className="success-popup">
      <div className="success-popup-content">
        <h2>Signup Successful!</h2>
        <p>Please click below to login to your account.</p>

        <div className="success-actions">
          <Link to="/LoginPage" className="success-link">Login</Link>
         
        </div>
      </div>
    </div>
  );
};

export default SuccessLogin;
