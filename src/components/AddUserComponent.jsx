import React from "react";
import axios from "axios";
import "../../styles/AddUser.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "At least 3 characters needed")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

const AddUserComponent = ({ onClose, onUserAdded }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", data);
      alert(res.data.message || "User added successfully!");

      if (onUserAdded) onUserAdded(res.data.newUser || res.data);

      reset();
      onClose();
    } catch (err) {
      console.error("Add user error:", err);
      alert(err.response?.data?.message || "Failed to add user.");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add New User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="add_user_form">
          <div className="label_error_group">
            <label>Name:</label>
          
          </div>
          <input type="text" placeholder="Name" {...register("name")} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          <div className="label_error_group">
            <label>Email:</label>
            
          </div>
          <input type="email" placeholder="Email" {...register("email")} />
{errors.email && <p className="error">{errors.email.message}</p>}
          <div className="label_error_group">
            <label>Phone:</label>
          
          </div>
          <input type="number" placeholder="Phone" {...register("phone")} />
  {errors.phone && <p className="error">{errors.phone.message}</p>}
          <div className="label_error_group">
            <label>Password:</label>
         
          </div>
          <input type="password" placeholder="Password" {...register("password")} />
   {errors.password && <p className="error">{errors.password.message}</p>}
          <div className="label_error_group">
            <label>Confirm Password:</label>
            
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
{errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          <div className="popup-buttons">
            <button type="submit" className="new_btn">Add User</button>
            <button type="button" onClick={onClose} className="new_cls_btn">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserComponent;
