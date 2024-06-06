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

const ComplaintListHOD = ({ userType, status, listOff }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [complaintDescription, setComplaintDescription] = useState("OFF");

  const [showDialog, setShowDialog] = useState(false);
  const [revertReason, setRevertReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRevert = () => {
    setComplaintDescription("OFF");
    setShowDialog(true);
    setComplaintDescription("OFF");
  };

  const handleSubmit = () => {
    setComplaintDescription("ON");
    handleAction("revert");
    setShowDialog(false);
    setComplaintDescription("OFF");
  };

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      if (status === "history") {
        const response = await axios.post(`${backendURL}/api/get_history`, {email: localStorage.getItem('emailUser'), userType: localStorage.getItem('typeUser')});
        console.log(response.data);

        setComplaints(response.data);
      } else {
        const response = await axios.get(`${backendURL}/complaints/${status}`);
        console.log(response.data);
        const sortedComplaints = response.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setComplaints(sortedComplaints);
      }
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

  const convertStatus = {
    revert: "HOD Reverted",
    approve: "HOD Approved",
    decline: "HOD Declined",
    resolve: "Resolved",
  };
  const handleComplaintSelect = (complaint) => {
    setSelectedComplaint(complaint);
    setComplaintDescription("ON");
  };
  const handleClose = () => {
    setComplaintDescription("OFF");
    setSelectedComplaint(null);
  };
  const handleAction = async (action) => {
    console.log(selectedComplaint.id);
    setLoading(true);
    if (action === "revert") {
      try {
        const response = await axios.put(
          `${backendURL}/api/complaints/${selectedComplaint.id}`,
          { status: convertStatus[action], revertMessage: revertReason },
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response1 = await axios.post(`${backendURL}/api/add_history`, {
          email: localStorage.getItem("emailUser"),
          id: selectedComplaint.id,
          userType: localStorage.getItem("typeUser"),
          date: selectedComplaint.date,
          category: selectedComplaint.category,
          action: action,
        });
        console.log(response1.data.message);
        alert(`Complaint "${selectedComplaint.category}" ${action}ed.`);
        fetchComplaints();
        setComplaintDescription("OFF");
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert(error.message);
      }
    } else {
      try {
        const response = await axios.put(
          `${backendURL}/api/complaints/${selectedComplaint.id}`,
          { status: convertStatus[action] },
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response1 = await axios.post(`${backendURL}/api/add_history`, {
          email: localStorage.getItem("emailUser"),
          id: selectedComplaint.id,
          userType: localStorage.getItem("typeUser"),
          date: selectedComplaint.date,
          category: selectedComplaint.category,
          action: action,
        });
        console.log(response1.data.message);
        alert(`Complaint "${selectedComplaint.category}" ${action}d.`);
        fetchComplaints();
        setComplaintDescription("OFF");
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert(error.message);
      }
    }
    setLoading(false);
  };
  return (
    <div className="complaint-list">
      <h2>Complaint List</h2>
      {status !== "history" && <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date Created</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
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
                onClick={() => handleComplaintSelect(complaint)}
              >
                <td>{complaint.id}</td>
                <td>{complaint.date}</td>
                <td>{complaint.category}</td>
                <td>{complaint.status}</td>
                <td>
                  <div className="view-btn">
                    <button>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>)}
        </table>
      </div>}

      {status === "history" && <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date Created</th>
              <th>Category</th>
              <th>Action</th>
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
                <td>{complaint.action}</td>
              </tr>
            ))}
          </tbody>)}
        </table>
      </div>}

      {complaintDescription === "ON" && (
        <div className="complaint-dialog">
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
          <h3>{selectedComplaint.id}</h3>
          <p>{selectedComplaint.description}</p>
          {status === "New" && (
            <div className="button-container">
              {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={50}
                  width={50}
                />
              </div>):(<><button
                className={`action-button ${actionClasses.approve}`}
                onClick={() => handleAction("approve")}
              >
                Approve
              </button>
              <button
                className={`action-button ${actionClasses.decline}`}
                onClick={() => handleAction("decline")}
              >
                Decline
              </button></>)}
              <button
                className={`action-button ${actionClasses.revert}`}
                onClick={() => handleRevert()}
              >
                Revert
              </button>
            </div>
          )}
          {status === "departmental" && (
            <div className="button-container">
              {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={50}
                  width={50}
                />
              </div>):(<button
                className={`action-button ${actionClasses.approve}`}
                onClick={() => handleAction("resolve")}
              >
                Resolve and Close
              </button>)}
            </div>
          )}
        </div>
      )}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className="idialog"
      >
        <DialogTitle>Enter message to revert</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            value={revertReason}
            onChange={(e) => setRevertReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={50}
                  width={50}
                />
              </div>):(<Button onClick={handleSubmit}>Submit</Button>)}
        </DialogActions>
      </Dialog>
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

export default ComplaintListHOD;
