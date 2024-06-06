import React, { useEffect, useState } from "react";
import "../complaintList/complaintList.css";
import axios from "axios";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner";

const FeedbackList = ({ listOff }) => {
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbackMessages = async () => {
    setLoading(true);
    try {
        const response5 = await axios.post(`${backendURL}/api/feedback/Feedback`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setLoading(false);
        console.log(response5.data);
        setFeedbackMessages(response5?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
        alert(error.message);
        throw error;
      }
};




useEffect(() => {
    fetchFeedbackMessages();
}, []);

  return (
    <div className="complaint-list">
      <h2>Feedback Messages</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Message</th>
            </tr>
          </thead>
          {loading ? (<div className="loader-container"> {/* Container for centering */}
                <ColorRing
                  color="blue"
                  height={130}
                  width={130}
                />
              </div>):(<tbody>
            {feedbackMessages.map((message) => (
              <tr
                key={message.id}
              >
                <td>{message.id}</td>
                <td>{message.user}</td>
                <td>{message.message}</td>
                <td>
                  {/* <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button> */}
                  {/* <button onClick={() => handleAction("decline")}>Decline</button> */}
                </td>
              </tr>
            ))}
          </tbody>)}
        </table>
      </div>
      
      <button onClick={() => listOff()}>Go Back</button>
    </div>
  );
};


export default FeedbackList;
