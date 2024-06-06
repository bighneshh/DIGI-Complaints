import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./complaintList.css";
import axios from "axios";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner";

const ComplaintListUser = ({ userType, status, listOff }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendURL}/complaints/${status}?user_email=${localStorage.getItem('emailUser')}`
      );
      console.log(response.data);
      const sortedComplaints = response.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
  
      setComplaints(sortedComplaints);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
      setLoading(false);
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, [status]);


  return (
    <div className="complaint-list">
      <h2>Complaint List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date Created</th>
              <th>Category</th>
              <th>Description</th>
              {status === "reverted" && <th>Message</th>}
            </tr>
          </thead>
          {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={130}
                  width={130}
                />
              </div>):(<tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
              >
                <td>{complaint.id}</td>
                <td>{complaint.date}</td>
                <td>{complaint.category}</td>
                <td>{complaint.description}</td>
                {status === "reverted" && <td>{complaint.revertMessage}</td>}
              </tr>
            ))}
          </tbody>)}
        </table>
      </div>
      <div className="back-btn">
        <button onClick={() => listOff()}>Go Back</button>
      </div>
    </div>
  );
};

const actionClasses = {
  approve: "action-button-approve",
  decline: "action-button-decline",
  revert: "action-button-revert",
};

export default ComplaintListUser;
