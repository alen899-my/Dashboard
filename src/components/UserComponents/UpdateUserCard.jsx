
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/UserCard.css"; 

const UpdateUserCard = ({ user, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",

      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
  `http://localhost:5000/api/admin/users/${user._id}`,
  formData
);
      alert("User updated successfully!");
      onUserUpdated(res.data); 
      onClose(); 
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="usercard_overlay">
      <div className="usercard_container">
        <h2>Update User</h2>

        <form onSubmit={handleSubmit} className="user_form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          

          <div className="btn_group">
            <button type="submit" className="save_btn">Save</button>
            <button type="button" onClick={onClose} className="close_btn2">X</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserCard;
