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
import QuotesList from "./quotesList";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner";

const ComplaintListPIC = ({ userType, status, listOff }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState("OFF");
  const [complaints, setComplaints] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [quotesON, setQuotesON] = useState("OFF");
  const [loading, setLoading] = useState(false);

  const [showDialogApprove, setShowDialogApprove] = useState(false);

  const handleApprove = () => {
    setComplaintDescription("OFF");
    setShowDialogApprove(true);
    setComplaintDescription("OFF");
  };

  const handlePostJob = () => {
    setComplaintDescription("ON");
    handleAction("postJob");
    setShowDialogApprove(false);
    setComplaintDescription("OFF");
  };

  //   complaints = [
  //     {'id': 1, 'title': 'Issue with hardware', 'description': 'Hardware malfunction', 'status': 'New'},
  //     {'id': 2, 'title': 'Software bug', 'description': 'Software not functioning properly', 'status': 'New'},
  ///*-*/  //     {'id': 3, 'title': 'Network connectivity problem', 'description': 'Cannot connect to the network', 'status': 'New'},
  // ]
  // const [status, setStatus] = useState('HOD Reverted');
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      if (status === "history") {
        const response = await axios.post(`${backendURL}/api/get_history`, {
          email: localStorage.getItem("emailUser"),
          userType: localStorage.getItem("typeUser"),
        });
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
    postJob: "Job Posted",
  };
  console.log(status);

  const handleComplaintSelect = (complaint) => {
    setSelectedComplaint(complaint);
    setComplaintDescription("ON");
  };

  const handleListOff = () => {
    setQuotesON("OFF");
  };

  const handleComplaintSelect1 = (complaint) => {
    setQuotesON("ON");
    setSelectedComplaint(complaint);
  };
  const handleClose = () => {
    setComplaintDescription("OFF");
    setSelectedComplaint(null);
  };

  const handlePayBill = async (Complaint) => {
    try {
      setLoading(true);
      console.log(Complaint.id);
      await axios.put(`${backendURL}/api/complaints/${Complaint.id}/resolve`);
      const response1 = await axios.post(`${backendURL}/api/add_history`, {
        email: localStorage.getItem("emailUser"),
        id: Complaint.id,
        userType: localStorage.getItem("typeUser"),
        date: Complaint.date,
        category: Complaint.category,
        action: "Bill Paid",
      });
      console.log(response1.data.message);
      alert("Complaint status updated to Resolved");
      fetchComplaints();
      setLoading(false);
    } catch (error) {
      console.error("Error updating complaint status:", error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const handleAction = async (action) => {
    console.log(selectedComplaint.id);
    setLoading(true);
    if (action === "postJob") {
      try {
        const response = await axios.put(
          `${backendURL}/api/complaints/${selectedComplaint.id}`,
          {
            status: convertStatus[action],
            vendorCategory:
              selectedOption === "Other" ? selectedOption1 : selectedOption,
          },
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
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert(error.message);
      }
    }
    setLoading(false);
  };
  return (
    <>
      {quotesON === "ON" && (
        <QuotesList status={selectedComplaint.id} listOff={handleListOff} />
      )}
      {quotesON === "OFF" && (
        <div className="complaint-list">
          <h2>Complaint List</h2>
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
                {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={130}
                  width={130}
                />
              </div>):(<tbody>
                  {status === "Budget Assigned" &&
                    complaints.map((complaint) => (
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
                            <button>Post Job</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {status === "Job Posted" &&
                    complaints.map((complaint) => (
                      <tr
                        key={complaint.id}
                        onClick={() => handleComplaintSelect1(complaint)}
                      >
                        <td>{complaint.id}</td>
                        <td>{complaint.date}</td>
                        <td>{complaint.category}</td>
                        <td>{complaint.status}</td>
                        <td>
                          <div className="view-btn">
                            <button>Review Quotes</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {status === "Job Completed" &&
                    complaints.map((complaint) => (
                      <tr
                        key={complaint.id}
                        onClick={() => handlePayBill(complaint)}
                      >
                        <td>{complaint.id}</td>
                        <td>{complaint.date}</td>
                        <td>{complaint.category}</td>
                        <td>{complaint.status}</td>
                        <td>
                          <div className="view-btn">
                            <button>Pay Bill and Close</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>)}
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
                {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={130}
                  width={130}
                />
              </div>):(<tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id}>
                      <td>{complaint.id}</td>
                      <td>{complaint.date}</td>
                      <td>{complaint.category}</td>
                      <td>{complaint.action}</td>
                    </tr>
                  ))}
                </tbody>)}
              </table>
            </div>
          )}

          {complaintDescription === "ON" && (
            <div className="complaint-dialog">
              <button className="close-button" onClick={handleClose}>
                Close
              </button>
              <h3>{selectedComplaint.id}</h3>
              <p>{selectedComplaint.description}</p>
              {status === "Budget Assigned" && (
                <div className="button-container">
                  <button
                    className={`action-button ${actionClasses.approve}`}
                    onClick={() => handleApprove()}
                  >
                    Post Job
                  </button>
                </div>
              )}
            </div>
          )}
          <Dialog
            open={showDialogApprove}
            onClose={() => setShowDialogApprove(false)}
            className="idialog"
          >
            <DialogTitle>Select Vendor Category</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel
                  id="option-label"
                  style={{ backgroundColor: "white" }}
                >
                  Select Option
                </InputLabel>
                <Select
                  labelId="option-label"
                  id="option"
                  value={selectedOption}
                  style={{ backgroundColor: "white" }}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  label="Select Option"
                >
                  {/* Menu Items */}
                  <MenuItem
                    value="Electricty"
                    style={{ backgroundColor: "white" }}
                  >
                    Electricity
                  </MenuItem>
                  <MenuItem
                    value="Water/Sanitary"
                    style={{ backgroundColor: "white" }}
                  >
                    Water/Sanitary
                  </MenuItem>
                  <MenuItem
                    value="Furniture"
                    style={{ backgroundColor: "white" }}
                  >
                    Furniture
                  </MenuItem>
                  <MenuItem
                    value="Equipment"
                    style={{ backgroundColor: "white" }}
                  >
                    Equipment
                  </MenuItem>
                  <MenuItem
                    value="Infrastructure"
                    style={{ backgroundColor: "white" }}
                  >
                    Infrastructure
                  </MenuItem>
                  <MenuItem
                    value="Sports"
                    style={{ backgroundColor: "white" }}
                  >
                    Sports
                  </MenuItem>
                  <MenuItem value="Other" style={{ backgroundColor: "white" }}>
                    Other
                  </MenuItem>
                </Select>
              </FormControl>
              {selectedOption === "Other" && (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Write Category"
                  type="text"
                  fullWidth
                  value={selectedOption1}
                  onChange={(e) => setSelectedOption1(e.target.value)}
                />
              )}
            </DialogContent>
            <DialogActions>
              {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={50}
                  width={50}
                />
              </div>):(<Button onClick={handlePostJob}>Post Job to Vendors</Button>)}
            </DialogActions>
          </Dialog>
          <div className="back-btn">
            <button onClick={() => listOff()}>Go Back</button>
          </div>
        </div>
      )}
    </>
  );
};

const actionClasses = {
  approve: "action-button-approve",
  decline: "action-button-decline",
  revert: "action-button-revert",
};

export default ComplaintListPIC;
