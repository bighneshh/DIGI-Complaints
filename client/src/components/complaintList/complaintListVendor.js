import React, { useEffect, useState } from "react";
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
import "./complaintList.css";
import axios from "axios";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner";

const ComplaintListVendor = ({ userType, status, listOff }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState("OFF");
  const [complaints, setComplaints] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [quoteData, setQuoteData] = useState({
    userEmail: localStorage.getItem("emailUser"),
    rate: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [showDialogApprove, setShowDialogApprove] = useState(false);
  const vendor_type = localStorage.getItem("typeVendor");

  const handleBill = async (complaint_id) => {
    setLoading(true);
    setComplaintDescription("OFF");
    const billAmount = prompt("Enter the bill amount:");
    console.log(quoteData.userEmail);
    try {
      const response = await axios.post(
        `${backendURL}/api/complaints/${complaint_id}/complete-job`,
        { billAmount: Number(billAmount) }
      );

      const response1 = await axios.post(`${backendURL}/api/add_history`, {
        email: localStorage.getItem("emailUser"),
        id: complaint_id,
        userType: localStorage.getItem("typeUser"),
        date: selectedComplaint?.date,
        category: selectedComplaint?.category,
        action: "Bill Amount Sent",
      });
      setLoading(false);
      console.log(response1.data.message);
      console.log(response.data);
      alert("Bill amount submitted successfully");
      fetchComplaints();
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const handleApprove = () => {
    setComplaintDescription("OFF");
    setShowDialogApprove(true);
    setComplaintDescription("OFF");
  };

  const handlePostJob = () => {
    setComplaintDescription("ON");
    handleAction("quoteRate");
    setShowDialogApprove(false);
    setComplaintDescription("OFF");
  };

  const fetchComplaints = async () => {
    setLoading(true);
    console.log(status);
    console.log("ye h", quoteData.userEmail);
    if (status === "history") {
      try {
        const response = await axios.post(`${backendURL}/api/get_history`, {
          email: localStorage.getItem("emailUser"),
          userType: localStorage.getItem("typeUser"),
        });
        console.log(response.data);
        setComplaints(response.data);
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    } else if (status === "Vendor Assigned") {
      try {
        const response = await axios.get(
          `${backendURL}/api/complaints/vendor-assigned/${quoteData.userEmail}`
        );
        console.log("yahan:", response.data);
        console.log(quoteData.userEmail);
        const sortedComplaints = response.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setComplaints(sortedComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error.message);
        setLoading(false);
        alert(error.message);
      }
    } else {
      try {
        const response = await axios.get(
          `${backendURL}/api/complaints/posted?vendor_type=${vendor_type}`
        );
        console.log("yahan:", response.data);
        const sortedComplaints = response.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setComplaints(sortedComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error.message);
        setLoading(false);
        alert(error.message);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchComplaints();
  }, [status]);

  const convertStatus = {
    postJob: "Job Posted",
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

    if (action === "quoteRate") {
      try {
        const response = await axios.post(
          `${backendURL}/api/complaints/${selectedComplaint.id}/quotes`,
          quoteData,
          {
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
        alert(response.data.message);

        fetchComplaints();
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error :", error);
        setLoading(false);
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
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert(error.message);
        setLoading(false);
      }
    }
    setLoading(false);
  };
  return (
    <div className="complaint-list">
      <h2>Jobs List</h2>
      {status !== "history" && (
        <div className="table">
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
            {loading ? (
              <div className="loader-container">
                {" "}
                {/* Container for centering */}
                <ColorRing color="blue" height={130} width={130} />
              </div>
            ) : (
              <tbody>
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
                      {status === "Job Posted" && (
                        <div className="view-btn">
                          <button>Quote Rate</button>
                        </div>
                      )}
                      {status === "Vendor Assigned" && (
                        <div className="view-btn">
                          {loading ? (
                            <div className="loader-container">
                              {" "}
                              {/* Container for centering */}
                              <ColorRing color="blue" height={50} width={50} />
                            </div>
                          ) : (
                            <button onClick={() => handleBill(complaint.id)}>
                              Job Done and Send Bill
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}

      {status === "history" && (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Created</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading ? (
              <div className="loader-container">
                {" "}
                {/* Container for centering */}
                <ColorRing color="blue" height={130} width={130} />
              </div>
            ) : (
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.id}</td>
                    <td>{complaint.date}</td>
                    <td>{complaint.category}</td>
                    <td>{complaint.action}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}

      {complaintDescription === "ON" && status !== "Vendor Assigned" && (
        <div className="complaint-dialog">
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
          <h3>{selectedComplaint.id}</h3>
          <p>{selectedComplaint.description}</p>
          {status === "Job Posted" && (
            <div className="button-container">
              <button
                className={`action-button ${actionClasses.approve}`}
                onClick={() => handleApprove()}
              >
                Quote Rate for this Job
              </button>
            </div>
          )}
          {status === "Vendor Assigned" && (
            <div className="button-container">
              {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={50}
                  width={50}
                />
              </div>):(<button
                className={`action-button ${actionClasses.approve}`}
                onClick={() => handleBill()}
              >
                Job Done and Send Bill
              </button>)}
            </div>
          )}
        </div>
      )}

      <Dialog
        open={showDialogApprove}
        onClose={() => setShowDialogApprove(false)}
        className="idialog"
      >
        <DialogTitle>Quote Rate and Send message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Rate"
            type="number"
            fullWidth
            value={quoteData.rate}
            onChange={(e) =>
              setQuoteData((prevState) => ({
                ...prevState,
                rate: e.target.value,
              }))
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="Write a message"
            type="text"
            fullWidth
            value={quoteData.message}
            onChange={(e) =>
              setQuoteData((prevState) => ({
                ...prevState,
                message: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          {loading ? (
            <div className="loader-container">
              {" "}
              {/* Container for centering */}
              <ColorRing color="blue" height={50} width={50} />
            </div>
          ) : (
            <Button onClick={handlePostJob}>SEND</Button>
          )}
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

export default ComplaintListVendor;
