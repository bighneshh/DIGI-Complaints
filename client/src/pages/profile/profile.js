import React, { useEffect, useState } from "react";
import "./profile.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner"; // Import the specific loader type

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [userImageURL, setUserImageURL] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [loading, setLoading] = useState(false); // Add loading state for the loader
  const emailUser = localStorage.getItem("emailUser");
  const userType = localStorage.getItem("typeUser");

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching profile data
        const response = await axios.get(
          `${backendURL}/api/profile/${userType}?email=${emailUser}`
        );
        setUser(response?.data?.userdata);
        setUserImageURL(
          `data:image/jpeg;base64,${response?.data?.userdata?.photo}`
        );
        user.user_id = response.data.user_id;
        editedUser.user_id = response.data.user_id;
        setEditedUser(response?.data?.userdata);
        setLoading(false); // Set loading to false after fetching profile data
      } catch (error) {
        setLoading(false); // Set loading to false in case of an error
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when submitting the form
      const res = await axios.put(
        `${backendURL}/api/profile/${userType}`,
        editedUser
      );
      alert(res.data.message);
      // Refresh user profile data
      const response = await axios.get(
        `${backendURL}/api/profile/${userType}?email=${emailUser}`
      );
      setUser(response.data.userdata);
      user.user_id = response.data.user_id;
      setLoading(false); // Set loading to false after submitting the form
      handleClose();
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      console.error("Error updating profile data:", error);
      alert(error.message);
    }
    console.log("Edited User:", editedUser);
  };

  console.log(editedUser);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>
      {loading ? ( // Show loader if loading is true
        <div className="loader">
          <ColorRing color="#007bff" height={100} width={100} />
        </div>
      ) : (
        <div className="user-details">
          <img src={userImageURL} alt="User" className="user-photo" />
          <div className="user-info">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>User Type:</strong> {user.userType}
            </p>
            <p>
              <strong>Unique ID:</strong> {user.uniqueId}
            </p>
          </div>
        </div>
      )}

      <div className="edit-button">
        <Button variant="contained" onClick={handleOpen}>
          Edit Profile
        </Button>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} className="edit-dialog">
        <DialogTitle className="dialog-title">Edit Profile</DialogTitle>
        <DialogContent className="dialog-content">
          {/* Form for editing profile */}
          <TextField
            sx={{ marginTop: "14px" }}
            name="firstName"
            label="First Name"
            value={editedUser.firstName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            sx={{ marginTop: "14px" }}
            name="lastName"
            label="Last Name"
            value={editedUser.lastName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            sx={{ marginTop: "14px" }}
            name="email"
            label="Email"
            value={editedUser.email}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            sx={{ marginTop: "14px" }}
            name="secqn1"
            label="Security Question 1"
            value={editedUser.secqn1}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            sx={{ marginTop: "14px" }}
            name="secqn2"
            label="Security Question 2"
            value={editedUser.secqn2}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            sx={{ marginTop: "14px" }}
            name="secqn3"
            label="Security Question 3"
            value={editedUser.secqn3}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            sx={{ marginTop: "14px" }}
            name="secqn4"
            label="Security Question 4"
            value={editedUser.secqn4}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            sx={{ marginTop: "14px" }}
            name="uniqueId"
            label="Unique ID"
            value={editedUser.uniqueId}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          {loading ? (
            <div className="loader-container">
              {" "}
              {/* Container for centering */}
              <ColorRing color="blue" height={50} width={50} />
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="save-button"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
