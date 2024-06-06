import React, { useState } from "react";
import "./complaint.css"; // Import CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner";

const CreateComplaintForm = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    date: "",
    category: "",
    description: "",
    forwardTo: "", // Add a new state to handle forwarding option
  });
  credentials.complainant = localStorage.getItem("emailUser");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendURL}/complaints/register`, // Change to your API endpoint
        credentials
      );
      console.log("Complaint submitted:", response.data);
      setLoading(false);
      alert(response.data.message);
      alert(`Note the Complaint Unique Id: ${response.data.doc_id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  // Function to handle forwarding options
  const handleForwardOptionChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className="create-complaint-form">
      <img
        src="/images/Digi Complaints-logos_white.png"
        alt="Logo"
        className="logo"
      />
      <div className="complaint-form-container">
        <h2 className="form-heading">CREATE COMPLAINT</h2>
        <form onSubmit={handleSubmit} className="complaint-form">
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Problem Category:</label>
            <select onChange={handleChange} name="category" required>
              <option value="">Select Category</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Ragging">Ragging</option>
              <option value="Equipments">Equipments</option>
              <option value="Furniture">Furniture</option>
              <option value="Department Exclusive">Department Exclusive</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              onChange={handleChange}
              required
              rows="7"
            />
          </div>
          {credentials.category === "Ragging" && ( // Show forwarding options only if category is Ragging
            <div className="form-group">
              <label>Forward to:</label>
              <select
                onChange={handleForwardOptionChange}
                name="forwardTo"
                required
              >
                <option value="">Select Option</option>
                <option value="principal">Principal</option>
                <option value="hod">Head of Department</option>
              </select>
            </div>
          )}
          {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={60}
                  width={60}
                />
              </div>):(<button type="submit" className="complaint-submit-button">
            Submit
          </button>)}
        </form>
      </div>
    </div>
  );
};

export default CreateComplaintForm;
