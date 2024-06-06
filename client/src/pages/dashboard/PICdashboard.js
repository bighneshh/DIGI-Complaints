import React, { useEffect, useState } from "react";
import "./dashboard1.css";
import { HiUserGroup } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import { FaFolderOpen } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdPendingActions } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ComplaintList from "../../components/complaintList/complaintList";
import TrackStatus from "../../components/trackStatus/trackStatus";
import ComplaintListPrincipal from "../../components/complaintList/complaintListPrincipal";
import ComplaintListPIC from "../../components/complaintList/complaintListPIC";
import HelpListUser from "../../components/complaintList/helpList";
import backendURL from "../../config";
const PICDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [userData, setUserData] = useState({
    email: localStorage.getItem("emailUser"),
  });
  const [displayName, setDisplayName] = useState("");
  const [userImageURL, setUserImageURL] = useState(null);
  const [typeUser, setTypeUser] = useState(localStorage.getItem("typeUser"));
  const navigate = useNavigate();
  const [cListStatus, setCListStatus] = useState("OFF");
  const [status, setStatus] = useState("");


  function handleListOff() {
    setCListStatus("OFF");
    setStatus("");
  }
  const handleOpenList = (Status) => {
    setStatus(Status);
    setCListStatus("ON");
  };


  const getUserData = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/dashboard/${typeUser}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDisplayName(
        response?.data?.firstName + " " + response?.data?.lastName
      );
      setUserImageURL(`data:image/jpeg;base64,${response?.data?.userImage}`);
      // localStorage.setItem('cList', 'OFF');
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // localStorage.setItem('cList', 'OFF');
    (async () => {
      typeUser && (await getUserData());
    })();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
    marginLeft: '50px',
    width: '60%',
    height: '70%',
    color: '#333',
  };

  const dropdownContainerStyle = {
    backgroundColor: '#fff', // Change the background color as needed
    borderRadius: '14px', // Optional: Add border radius for rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add box shadow for depth
  };

  const optionStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '17px',
    color: '#333',
    margin: '0',
    padding: '2px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Add transition for smooth effect
    backgroundColor: 'transparent',
  };
  

  return (
    <div className="amain">
      <div className="aleft">
        <div className="up">
          <img
            className="alogo"
            alt="imageN"
            src="/images/Digi Complaints-logos_white.png"
          />

          <img className="avatar" alt="imageN2" src={userImageURL} />

          <div className="name">{displayName}</div>
        </div>

        <div className="details">
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/dashboard")}>Dashboard</p>
          <p onClick={() => navigate("/profile")}>Profile</p>
          <div className="drop">
            <p onClick={toggleMenu} className="dropdown-toggle">
            Complaint{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 17l5-5-5-5v10z" />
              </svg>
            </p>
            {isOpen && (
              <div className="dc" style={{ ...dropdownContainerStyle, ...dropdownStyle }}>
                <p style={optionStyle} onClick={() => navigate("/complaint")}>Create Complaint</p>
                <p style={optionStyle} onClick={() => navigate("/trial")}>Track Status of a Complaint</p>
              </div>
            )}
          </div>
          <p></p>
          <p onClick={() => setCListStatus("HELP")}>Help</p>
          <p onClick={() => {localStorage.setItem("emailUser", ''); navigate("/")}}>Sign out</p>
        </div>
      </div>
      {cListStatus === "trackStatus" && <TrackStatus />}
      {cListStatus === "OFF" && (
        <div className="aright">
          <div className="con1">
            <div className="mobiles"></div>
            <div className="cd"> PIC DASHBOARD</div>
          </div>
          <div className="con2">
            <div
              className="acard"
              style={{backgroundColor: "orange"}}
              onClick={() => handleOpenList("Budget Assigned")}
            >
              <div className="cr">
                <p className="cp"> ASSIGNED COMPLAINTS </p>
                <p className="cp">2</p>
                <p className="cv">
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 17l5-5-5-5v10z" />
                  </svg>
                </p>
              </div>
              <div className="cl">
                <IoPerson />
              </div>
            </div>

            <div className="acard" style={{backgroundColor: "red"}} onClick={() => handleOpenList("Job Posted")}>
              <div className="cr">
                <p className="cp"> REVIEW VENDER QUOTES </p>
                <p className="cp">2</p>
                <p className="cv">
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 17l5-5-5-5v10z" />
                  </svg>
                </p>
              </div>
              <div className="cl">
                <HiUserGroup />
              </div>
            </div>

            <div className="acard" style={{backgroundColor: "green"}} onClick={() => handleOpenList("Job Completed")}>
              <div className="cr">
                <p className="cp"> PENDING BILLS </p>
                <p className="cp">2</p>
                <p className="cv">
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 17l5-5-5-5v10z" />
                  </svg>
                </p>
              </div>
              <div className="cl">
                <HiUserGroup />
              </div>
            </div>


            <div className="acard" style={{backgroundColor: "blue"}} onClick={() => handleOpenList("history")}>
              <div className="cr">
                <p className="cp"> COMPLAINTS HISTORY </p>
                <p className="cp">2</p>
                <p className="cv">
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 17l5-5-5-5v10z" />
                  </svg>
                </p>
              </div>
              <div className="cl">
                <HiUserGroup />
              </div>
            </div>
            
          </div>
        </div>
      )}
      {cListStatus === "ON" && (
        <ComplaintListPIC userType={typeUser} status={status} listOff={handleListOff}/>
      )}
      {cListStatus === "HELP" && (
        <HelpListUser listOff={handleListOff}/>
      )}
    </div>
  );
};

export default PICDashboard;
