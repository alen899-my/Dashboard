import React, { useState } from "react";
import "../styles/SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gicon from "../images/gicon.png";
import giticon from "../images/giticon.png";
import signup from "../images/signup.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
 name: yup
    .string()
    .trim()
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Enter a valid name (letters only)")
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .matches(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Enter a valid email address")
    .required("Email is required"),

  phone: yup .string() .matches(/^[0-9]{10}$/, "Phone number must be 10 digits") .required("Phone number is required"),
  Department: yup
    .string()
    .trim()
    .min(3, "Department must be at least 3 characters long")
    .required("Department is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&#^_]/, "Password must contain at least one special character")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const [success,setSuccess]=useState("")
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", data);
      setSuccess(true)
      
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.message || "Signup failed. Check backend or network.");
    }
  };

  return (
    <div className="signup_container">
      {/* Left Side - Image */}
      <div className="signup_container_image">
        <img src={signup} alt="Signup" />
      </div>

    
      <div className="signupcontainer_form">
        <h1>Signup</h1>
        <h3>Enter Your Details To Continue</h3>
        {success && ( 
        <div className="success_banner">
          <h4>Success! Click here to login:</h4>
          <div className="success-actions">
            <Link to="/LoginPage">Login</Link>
          </div>
        </div>
      )}
        <form onSubmit={handleSubmit(onSubmit)}>
  
          <label>Name:</label>
          <input type="text" {...register("name")} placeholder="Enter your name" />
          {errors.name && <p >{errors.name.message}</p>}

         
          <label>Email:</label>
          <input type="email" {...register("email")} placeholder="Enter your email" />
          {errors.email && <p >{errors.email.message}</p>}

         
          <label>Phone:</label>
          <input type="text" {...register("phone")} placeholder="Enter your phone number" />
          {errors.phone && <p >{errors.phone.message}</p>}
          <label>Department:</label>
          <input type="text" {...register("Department")} placeholder="Enter your Department " />
          {errors.Department && <p >{errors.Department.message}</p>}

        
          <label>Password:</label>
          <input type="password" {...register("password")} placeholder="Enter your password" />
          {errors.password && <p >{errors.password.message}</p>}

          
          <label>Confirm Password:</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p >{errors.confirmPassword.message}</p>
          )}

          <button type="submit">SignUp</button>
        </form>


        <h3 className="linkp">
          Already have an account? <Link to="/LoginPage">Login</Link>
        </h3>

        <div className="other_ways">
          <h3>Or SignUp using</h3>
          <div className="other_options">
            <button>
              <img src={gicon} alt="Google" /> Google
            </button>
            <button>
              <img src={giticon} alt="Github" /> Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
