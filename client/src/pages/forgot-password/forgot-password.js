import { Link, useNavigate } from "react-router-dom";
import "./forgot-password.css";
import { useState } from "react";
import axios from "axios";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner"; // Import the specific loader type

const ForgotPassword = () => {
  const [details, setDetails] = useState({
    uniqueid: "",
    secqn: "",
    secans: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state for the loader

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const forgotUserType = localStorage.getItem("forgotUserType");
    try {
      setLoading(true); // Set loading to true when the reset password request starts

      console.log("Entered: ", details);
      const response = await axios.post(
        `${backendURL}/reset-password/${forgotUserType}`,
        details,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false); // Set loading to false when the reset password request completes

      alert(response.data.message);
      navigate(`/login/${forgotUserType}`);
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      alert(error.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-logo">
        <img
          src="/images/Digi Complaints-logos_white.png"
          alt="Digi Complaints Logo"
        />
      </div>
      <div className="f-container">
        <form method="POST" action="#" onSubmit={handleSubmit}>
          <div className="title">RESET PASSWORD</div>
          <div className="input-box">
            <label for="password">UniqueID</label>
            <input
              type="text"
              id="uniqueid"
              name="uniqueid"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="secqn">Security Question:</label>
            <select id="secqn" name="secqn" onChange={handleChange} required>
              <option value="">Select a security question</option>
              <option value="secqn1">What is your favorite color?</option>
              <option value="secqn2">
                What is the name of your first pet?
              </option>
              <option value="secqn3">
                What is the name of your first school?
              </option>
              <option value="secqn4">
                What is the name of your birthplace?
              </option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="input-box">
            <label for="secans">Security Answer:</label>
            <input
              type="text"
              id="secans"
              name="secans"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label for="cpassword">Confirm Password:</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box button">
            {loading ? ( // Show loader if loading is true
              <div className="loader-container"> {/* Container for centering */}
              <ColorRing
                color="blue"
                height={60}
                width={60}
              />
            </div>
            ) : (
              <input type="submit" value="DONE" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;


