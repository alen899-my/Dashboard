import React, { useState } from "react";
import axios from "axios";
import "../../styles/AddUser.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BannerSucces from "./BannerSucces";

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
  Department: yup
    .string()
    .min(3, "At least 3 characters needed")
    .required("Name is required"),
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
  const [banner,setBanner]=useState(null)
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

    // ✅ Show success banner
    setBanner({
      type: "success",
      message: res.data.message || "User added successfully!",
    });

    // ✅ Reset form
    reset();

    if (onUserAdded) onUserAdded(res.data.newUser || res.data);

    // ✅ Auto-hide after 3 seconds
    setTimeout(() => {
      setBanner(null);
      onClose(); // close popup after banner
    }, 3000);
  } catch (err) {
    console.error("Add user error:", err);

    // ✅ Show error banner
    setBanner({
      type: "error",
      message: err.response?.data?.message || "Failed to add user.",
    });
  }
};


  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add New User</h2>
        {banner && (
     <BannerSucces
    type={banner.type}
    message={banner.message}
    onClose={() => setBanner(null)}
  />
    )}

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
  <label>Department:</label>
</div>

<select {...register("Department")} defaultValue="">
  <option value="" disabled>
    Select Department
  </option>
  <option value="HR">HR</option>
  <option value="IT">IT</option>
  <option value="Finance">Finance</option>
  <option value="Marketing">Marketing</option>
  <option value="Sales">Sales</option>
  <option value="Support">Support</option>
</select>

{errors.Department && <p className="error">{errors.Department.message}</p>}

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
