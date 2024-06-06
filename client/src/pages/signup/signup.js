import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendURL from "../../config";

const Signup = () => {
  const navigate = useNavigate();

  const [isSecurityQuestionsPopupOpen, setSecurityQuestionsPopupOpen] =
    useState(false);
  const handleOpenSecurityQuestionsPopup = () => {
    if (isSecurityQuestionsPopupOpen) setSecurityQuestionsPopupOpen(false);
    else setSecurityQuestionsPopupOpen(true);
  };

  const [showDialogApprove, setShowDialogApprove] = useState(false);
  const [vendorCategory, setVendorCategory] = useState(null);

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    branch: "",
    uniqueId: "",
    photo: null,
    password: "",
    cpassword: "",
    userType: "User",
    secqn1: "", // Add security question 1 field
    secqn2: "", // Add security question 2 field
    secqn3: "",
    secqn4: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  // Make HTTP POST request using async/await
  async function postSignupData() {
    try {
      const formData = new FormData();
      formData.append("firstName", signupData.firstName);
      formData.append("lastName", signupData.lastName);
      formData.append("email", signupData.email);
      formData.append("phoneNumber", signupData.phoneNumber);
      formData.append("branch", signupData.branch);
      formData.append("uniqueId", signupData.uniqueId);
      formData.append("photo", signupData.photo); // Append the photo here
      formData.append("password", signupData.password);
      formData.append("cpassword", signupData.cpassword);
      formData.append("userType", signupData.userType);
      formData.append("secqn1", signupData.secqn1);
      formData.append("secqn2", signupData.secqn2);
      formData.append("secqn3", signupData.secqn3);
      formData.append("secqn4", signupData.secqn4);
      formData.append("vendorCategory", vendorCategory ? vendorCategory : null);

      const response = await axios.post(
        `${backendURL}/signup`,
        formData, // Use formData instead of signupData
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          },
        }
      );
      localStorage.setItem("nameUser", "");
      alert(response.data.message);
      navigate(`/login/${signupData.userType}`);
      console.log("Response:", response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Function to handle input change and update signupData
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevSignupData) => ({
      ...prevSignupData,
      [name]: value,
    }));
    // console.log(signupData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSignupData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const secqn1 = signupData.secqn1.trim();
    const secqn2 = signupData.secqn2.trim();
    const secqn3 = signupData.secqn3.trim();
    const secqn4 = signupData.secqn4.trim();
    if (secqn1 && secqn2 && secqn3 && secqn4) {
      if (signupData.password === signupData.cpassword) {
        postSignupData();
        console.log("Signup Data:", signupData);
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    } else {
      alert("Please answer all security questions.");
    }
  };


  const handleVendorClick = () => {
    setShowDialogApprove(true);
  }
  

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="title">CREATE A NEW ACCOUNT HERE</div>
        <div className="content">
          <form method="POST" action="#" onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your number"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Branch</span>
                <input
                  type="text"
                  name="branch"
                  placeholder="Enter your Branch"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details" style={{fontSize: "18px"}}>Security Questions</span>
                <button onClick={handleOpenSecurityQuestionsPopup}>
                  Questions
                </button>
              </div>
              {isSecurityQuestionsPopupOpen && (
                <div className="security-questions-popup">
                  <h2>Security Questions</h2>
                  <div className="pop-input-box">
                    <label htmlFor="securityQuestion1">
                      What is your favorite color?
                    </label>
                    <input
                      type="text"
                      id="secqn1"
                      name="secqn1"
                      value={signupData.secqn1}
                      placeholder="Enter your answer"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="pop-input-box">
                    <label htmlFor="securityQuestion2">
                      What is the name of your first pet?
                    </label>
                    <input
                      type="text"
                      id="secqn2"
                      name="secqn2"
                      value={signupData.secqn2}
                      placeholder="Enter your answer"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="pop-input-box">
                    <label htmlFor="securityQuestion3">
                      What is the name of your first school?
                    </label>
                    <input
                      type="text"
                      id="secqn3"
                      name="secqn3"
                      value={signupData.secqn3}
                      placeholder="Enter your answer"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="pop-input-box">
                    <label htmlFor="securityQuestion4">
                      What is the name of your birthplace?
                    </label>
                    <input
                      type="text"
                      id="secqn4"
                      name="secqn4"
                      value={signupData.secqn4}
                      onChange={handleInputChange}
                      placeholder="Enter your answer"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="popClose-button"
                    onClick={handleOpenSecurityQuestionsPopup}
                  >
                    Close
                  </button>
                </div>
              )}

              <div className="input-box">
                <span className="details">UniqueId</span>
                <input
                  type="text"
                  name="uniqueId"
                  placeholder="Enter your UniqueId"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Photo</span>
                <input
                  className="file-input"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details" style={{fontSize: "20px"}}>Confirm Password</span>
                <input
                  type="password"
                  name="cpassword"
                  placeholder="Confirm your password"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords do not match</p>
            )}
            <div className="user-details">
              <input
                type="radio"
                name="userType"
                value="User"
                onChange={handleInputChange}
                id="dot-1"
              />
              <input
                type="radio"
                name="userType"
                value="HOD"
                onChange={handleInputChange}
                id="dot-2"
              />
              <input
                type="radio"
                name="userType"
                value="Principal"
                onChange={handleInputChange}
                id="dot-3"
              />
              <input
                type="radio"
                name="userType"
                value="PIC"
                onChange={handleInputChange}
                id="dot-4"
              />
              <input
                type="radio"
                name="userType"
                value="Vendor"
                onChange={handleInputChange}
                onClick={() => handleVendorClick()}
                id="dot-5"
              />
              
              <span className="user-title">Select User Type</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="userType">User</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="userType">HOD</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span className="userType">Principal</span>
                </label>
                <label htmlFor="dot-4">
                  <span className="dot four"></span>
                  <span className="userType">PIC</span>
                </label>
                <label htmlFor="dot-5">
                  <span className="dot five"></span>
                  <span className="userType">Vendor</span>
                </label>
                <label htmlFor="dot-6">
                  <span className="dot six"></span>
                  <span className="userType">Admin</span>
                </label>
              </div>
            </div>
            <Dialog
              open={showDialogApprove}
              onClose={() => setShowDialogApprove(false)}
              className="idialog"
            >
              <DialogTitle>Select Vendor Category</DialogTitle>
              <DialogContent>
                <FormControl fullWidth>
                  <InputLabel id="option-label">Select Option</InputLabel>
                  <Select
                    labelId="option-label"
                    id="option"
                    value={vendorCategory}
                    onChange={(e) => setVendorCategory(e.target.value)}
                    label="Select Option"
                  >
                    <MenuItem value={"Electricity"}>Electric Issues</MenuItem>
                    <MenuItem value={"Equipment"}>
                      Equipments (screen, CPU, AC, light fans,etc)
                    </MenuItem>
                    <MenuItem value={"Water/Sanitary"}>
                      Water/Sanitary Issues
                    </MenuItem>
                    <MenuItem value={"Furniture"}>Furniture</MenuItem>
                    <MenuItem value={"Infrastruture"}>Infrastructure</MenuItem>
                    <MenuItem value={"Sports"}>Sports Equipments</MenuItem>
                    <MenuItem value={"Other"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDialogApprove(false)}>Done</Button>
              </DialogActions>
            </Dialog>
            <div className="agreement">
              <label>
                <input type="checkbox" required />I Agree to
                <a href="/terms-and-conditions">{""} T & C</a>
              </label>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
