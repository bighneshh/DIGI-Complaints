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

const QuotesList = ({ userType, status, listOff }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState("OFF");
  const [complaints, setComplaints] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [quotesON, setQuotesON] = useState('OFF');

  const [showDialogApprove, setShowDialogApprove] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleApprove = () => {
    setComplaintDescription("OFF");
    setShowDialogApprove(true);
    setComplaintDescription("OFF");
  };


  const handleQuoteSelect = (quote) => {
    handleAction(quote);
  };

  
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendURL}/api/complaints/${status}/allquotes`
      );
      console.log("yahan:", response.data.quotes);
      setComplaints(response.data.quotes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Quotes:", error.message);
      setLoading(false);
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, [status]);

  console.log(status);

  const handleAction = async (quote) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${backendURL}/api/complaints/${status}/assign-vendor`,
          { selectedVendor: quote.user },
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        alert(`Comaplaint assigned to Vendor ${quote.user}`);
        fetchComplaints();
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert(error.message);
        setLoading(false);
      }
    
    
  };
  return (<>
      <div className="complaint-list">
        <h2>Quotes List</h2>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Proposed Rate</th>
                <th>Message from Vendor</th>
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
              {complaints.map((quote) => (
                <tr key={quote.id} >
                  
                  <td>{quote.user}</td>
                  <td>{quote.rate}</td>
                  <td>{quote.message}</td>
                  <td><div className="view-btn"><button onClick={() => handleQuoteSelect(quote)}>Select and Assign Job</button></div></td>
                </tr>
              ))}
              
            </tbody>)}
          </table>
        </div>
        
        <div className="back-btn">
          <button onClick={() => listOff()}>Go Back</button>
        </div>
      </div>
      
  </>);
};

const actionClasses = {
  approve: "action-button-approve",
  decline: "action-button-decline",
  revert: "action-button-revert",
};

export default QuotesList;
