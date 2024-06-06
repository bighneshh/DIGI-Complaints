import React, { useState } from "react";
import axios from "axios";
import "./feedback.css"; // Import CSS file for styling
import { Button, TextField } from "@mui/material";
import backendURL from "../../config";

const FeedbackComponent = () => {
  const [message, setMessage] = useState("");
  const user = localStorage.getItem("emailUser");
  const styles = {
    hover: {
      '&:hover': {
        borderColor: '#ffffff',
        boxShadow: '0 0 5px #ffffff',
      },
    },
  };
  const handleSubmit = async () => {
    console.log("hey");
    if (user) {
      try {
        const response = await axios.post(
          `${backendURL}/api/feedback`,
          { user, message }
        );
        console.log(response.data);
        alert(response.data.message);
        setMessage("");
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    } else {
      alert("Please login to submit feedback");
    }
  };

  return (
    <div className="left_contact">
      
      <p
        style={{
          marginTop:"80px",
          fontSize: "80px",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#f8f5f5e3",
          textShadow: "2px 2px 4px rgba(8, 139, 179, 0.636)",
        }}
      >
        FEEDBACK
      </p>
      <br></br>
      <TextField
      InputProps={{
        style: {
          color:"white", 
        },
      }}
        name="Name"
        label=" Name"
        fullWidth
        // sx={{ marginTop: "19px", border: "2px solid #ccc", borderRadius:"15px"},styles.hover}
        sx={{
          marginTop: "19px",
          border: "2px solid #ccc",
          borderRadius: "15px",
          ...styles.hover
        }}
      />
      <TextField
        InputProps={{
          style: {
            color:"white", 
          },
        }}
        name ="email" 
        label="Email Address"
        fullWidth
        sx={{ marginTop: "19px",border: "2px solid #ccc", borderRadius:"15px" }}
      />
      <TextField
        InputProps={{
          style: {
            height: "200px",
            color:"white", // Adjust the height as per your requirement
          },
        }}
        name="message"
        label="Enter Your Feedback Here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        sx={{ marginTop: "19px",border: "2px solid #ccc", borderRadius:"15px" }}
      />
      <Button
        variant="contained"
        sx={{ marginTop: "20px", marginBottom: "100px" }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default FeedbackComponent;
