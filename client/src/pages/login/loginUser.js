import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner"; // Import the specific loader type
import backendURL from "../../config";

function LoginUser() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleForgot = () => {
    localStorage.setItem('forgotUserType', "User");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login request starts
    try {
      console.log("Entered: ", credentials);
      const response = await axios.post(
        `${backendURL}/login/User`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const { email } = response.data;
      const { userType } = response.data;
      localStorage.setItem("emailUser", email);
      localStorage.setItem("typeUser", "User");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid Credentials");
    } finally {
      setLoading(false); // Set loading to false when the login request completes
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src="/images/Digi Complaints-logos_white.png" alt="Digi Complaints Logo" />
      </div>
      <div className="container">
        <form method="POST" action="#" onSubmit={handleSubmit}>
          <div className="title">User Login</div>
          <div className="input-box underline">
            <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
            <div className="underline"></div>
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <div className="underline"></div>
          </div>

          <div className="input-box button">
            {/* Conditional rendering of loader or login button */}
            {loading ? (
              <div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={60}
                  width={60}
                />
              </div>
            ) : (
              <input type="submit" value="LOGIN" />
            )}
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link onClick={handleForgot} to="/forgot-password">Forgot password?</Link>{" "}
          </div>
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Register</Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
