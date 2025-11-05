import React, { useState, useEffect } from "react";
import "../styles/SignupPage.css"; // ✅ Reuse same CSS
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gicon from "../images/gicon.png";
import giticon from "../images/giticon.png";
import login from "../images/login.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false); // Success banner
  const [showError, setShowError] = useState(false);     // Error banner

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/admin/home", { replace: true });
  }, [navigate]);

  // ✅ On Submit
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Show success banner
        setShowSuccess(true);
        setShowError(false);

        // Navigate after 2 seconds
        setTimeout(() => {
          navigate("/admin/home");
        }, 2000);
      }
    } catch (err) {
      console.error("Login error:", err);

      // Show error banner
      setShowError(true);
      setShowSuccess(false);

      // Optional: hide error banner after 3 seconds
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_container_image">
        <img src={login} alt="Login" />
      </div>

      <div className="signupcontainer_form">
        <h1>Login</h1>
        <h3>Enter Your Details To Continue</h3>

        {/* ✅ Conditional Banners */}
        {showSuccess && (
          <div className="success_banner" style={{ backgroundColor: "#d9ffd9", borderColor: "green" }}>
            <h4>Success! Login Completed. </h4>
          </div>
        )}

        {showError && (
          <div className="success_banner" style={{ backgroundColor: "#ffd6d6", borderColor: "red" }}>
            <h4> Login Failed! Check your email or password.</h4>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email:</label>
          <input type="email" {...register("email")} placeholder="Enter your email" />
          {errors.email && <p className="errorr">{errors.email.message}</p>}

          <label>Password:</label>
          <input type="password" {...register("password")} placeholder="Enter your password" />
          {errors.password && <p className="errorr">{errors.password.message}</p>}

          <button type="submit">Login</button>
        </form>

        <h3 className="linkp">
          Don’t have an account? <Link to="/SignupPage">SignUp</Link>
        </h3>

        <div className="other_ways">
          <h3>Or Login using</h3>
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

export default LoginPage;
