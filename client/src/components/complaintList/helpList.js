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

const HelpListUser = ({ userType, status, listOff }) => {
  
  return (
    <div className="complaint-list">
      <h2>Complaint List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Query</th>
              <th>Step</th>
              
            </tr>
          </thead>
          <tbody>
              <tr
                key=""
              >
                <td>Update Profile Details</td>
                <td>Go to profile section in dashboard, Update your profile there</td>
              </tr>
              <tr
                key=""
              >
                <td>Reset your password</td>
                <td>Click the forgot password button in the login page, enter verification details and create new password</td>
              </tr>
              <tr
                key=""
              >
                <td>Check status of a Complaint</td>
                <td>Select Track Status option from the dropdown menu of Complaint in the menu, a page will open, Enter the complaint ID of your complaint</td>
              </tr>

              <tr
                key=""
              >
                <td>Forgot ID of Complaint</td>
                <td>Go to dashboard, check for submitted complaints, you can find your complaints with their IDs</td>
              </tr>
          </tbody>
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

export default HelpListUser;
