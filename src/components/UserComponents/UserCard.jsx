import axios from "axios";
import React from "react";
import "../../styles/UserCard.css"; 

const UserCard = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="usercard_overlay">
      <div className="usercard_container">
        <button className="close_btn" onClick={onClose}>
          X
        </button>
        <h2>User Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        

        
      </div>
    </div>
  );
};

export default UserCard;
