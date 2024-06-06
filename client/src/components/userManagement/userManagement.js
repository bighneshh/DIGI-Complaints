import React, { useEffect, useState } from "react";
import "../../pages/dashboard/dashboard1.css";
import { HiUserGroup } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import { FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserList from "../usersList/usersList";
import AllUserList from "../usersList/allUsersList";
import FeedbackList from "../usersList/feedbackList";
  

const UserManagement = () => {
  const [typeUser, setTypeUser] = useState(localStorage.getItem("typeUser"));
  const [cListStatus, setCListStatus] = useState("OFF");


  function handleListOff() {
    setCListStatus("OFF");
    // setStatus("");
  }
//   const handleOpenList = (Status) => {
//     setStatus(Status);
//     setCListStatus("ON");
//   };

  const handleFetchList = async(cStatus) => {
    
        setCListStatus(cStatus);
      
  };

  return (<>
    {cListStatus === 'VERIFY' && <UserList listOff={handleListOff} />}
    {cListStatus === 'SHOWALL' && <AllUserList listOff={handleListOff} />}
    {cListStatus === 'FEEDBACKS' && <FeedbackList listOff={handleListOff} />}
    {cListStatus === 'OFF' && <div className="aright">
      <div className="con1">
        <div className="mobiles"></div>
        <div className="cd">USERS AND FEEDBACKS</div>
      </div>
      <div className="con2">
        <div className="acard" style={{backgroundColor: "red"}} onClick={() => handleFetchList("SHOWALL")}>
          <div className="cr">
            <p className="cp"> ALL USERS </p>
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

        <div className="acard" style={{backgroundColor: "green"}} onClick={() => handleFetchList("VERIFY")}>
          <div className="cr">
            <p className="cp"> VERIFY USERS </p>
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
        <div className="acard" style={{backgroundColor: "blue"}} onClick={() => handleFetchList("FEEDBACKS")}>
          <div className="cr">
            <p className="cp">FEEDBACKS</p>
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
            <FaFolderOpen />
          </div>
        </div>
        
      </div>
    </div>}
    </>
  );
};

export default UserManagement;
