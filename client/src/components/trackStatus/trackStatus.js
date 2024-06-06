import React, { useState } from "react";
import axios from "axios";
import "./trackStatus.css";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner";

const TrackStatus = () => {
  const [toggle, setToggle] = useState(false);
  const [status1, setStatus1] = useState("");
  const [status2, setStatus2] = useState("");
  const [status3, setStatus3] = useState("");
  const [status4, setStatus4] = useState("");
  const [status5, setStatus5] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [HODPrefix, setHODPrefix] = useState("Pending");
  const [PICStatus, setPICStatus] = useState("Pending at PIC Station");
  const [principalPrefix, setPrincipalPrefix] = useState("Pending");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setComplaintId(event.target.value); // Update complaint ID state when input changes
  };

  const handleWithdraw = async () => {
    setLoading(true);
    setStatus1("");
    setStatus2("");
    setStatus3("");
    setStatus4("");
    setStatus5("");
    setHODPrefix("Pending");
    setPrincipalPrefix("Pending");
    setPICStatus("Pending at PIC Station");
    try {
      const response = await axios.put(
        `${backendURL}/api/complaints/${complaintId}/withdraw`
      );
      setLoading(false);
      alert(response.data.message);
      setComplaintId("");
    } catch (error) {
      console.error("Error withdrawing complaint:", error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const fetchStatus = async () => {
    if (complaintId) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendURL}/api/complaints/status/${complaintId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        const statusData=response?.data?.status;
        if (statusData === "New") {
          setStatus1("active");
          setStatus2("inactive");
          setStatus3("inactive");
          setStatus4("inactive");
          setStatus5("inactive");
        } else if (statusData === "HOD Approved") {
          setStatus1("active");
          setStatus2("active");
          setStatus3("inactive");
          setStatus4("inactive");
          setStatus5("inactive");
          setHODPrefix("Approved");
        } else if (statusData === "Principal Approved") {
          setStatus1("active");
          setStatus2("active");
          setStatus3("active");
          setStatus4("inactive");
          setStatus5("inactive");
          setHODPrefix("Approved");
          setPrincipalPrefix("Approved");
        } else if (statusData === "Vendor Assigned") {
          setStatus1("active");
          setStatus2("active");
          setStatus3("active");
          setStatus4("active");
          setStatus5("inactive");
          setHODPrefix("Approved");
          setPrincipalPrefix("Approved");
          setPICStatus("Vendor Assigned");
        } else if (statusData === "Resolved") {
          setStatus1("active");
          setStatus2("active");
          setStatus3("active");
          setStatus4("active");
          setStatus5("active");
          setHODPrefix("Approved");
          setPrincipalPrefix("Approved");
          setPICStatus("Vendor Assigned");
        }
        setLoading(false);
        if (response.data.status) setToggle(true);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        alert("Enter valid ID or error fetching status");
      }
    } else {
      alert("Enter complaint ID");
    }
  };
  const PopUp = () => {
    return (
      <>
        <div className="popup">
          <div className="timeline">
            <div className="tdot-container">
              <div className={`tdot ${status1}`}>
                <div className="tdot-item">Submitted</div>
              </div>
              <div className={`tdot ${status2}`}>
                <div className="tdot-item">{HODPrefix} by HOD</div>
              </div>
              <div className={`tdot ${status3}`}>
                <div className="tdot-item">{principalPrefix} by Principal</div>
              </div>
              <div className={`tdot ${status4}`}>
                <div className="tdot-item">{PICStatus}</div>
              </div>
              <div className={`tdot ${status5}`}>
                <div className="tdot-item">Resolved</div>
              </div>
            </div>

            <div className="twithdraw">
              {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={60}
                  width={60}
                />
              </div>):(<button
                id="twithdraw"
                style={{marginTop: "120px",height:"70px",width:"180px",backgroundColor:'red'}}
                onClick={() => {
                  handleWithdraw();
                  setToggle(false);
                }}
              >
                WITHDRAW COMPLAIN
              </button>)}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="total-Tracking">
        <div className="complaint_tracker">
          <p id="tracker_heading">TRACK COMPLAINT STATUS</p>
          <div className="complaint">
            <p id="complaint">Complaint Id :</p>
            <input
              type="text"
              placeholder=""
              id="input"
              value={complaintId} // Bind input value to complaintId state
              onChange={handleInputChange} // Call handleInputChange function on input change
            />
            {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="green"
                  height={60}
                  width={60}
                />
              </div>):(<button
              id="track_button"
              onClick={() => {
                fetchStatus();
              }}
            >
              TRACK
            </button>)}
          </div>
        </div>
        {toggle && <PopUp />}
      </div>
    </>
  );
};

export default TrackStatus;
