import React, { useEffect, useState } from "react";
import "../complaintList/complaintList.css";
import axios from "axios";
import backendURL from "../../config";
import { ColorRing } from "react-loader-spinner";

const UserList = ({ listOff }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
        console.log("hello");
        const response = await axios.post(`${backendURL}/api/verify/users`, {
          userTypes: ["HOD", "Principal", "PIC", "Vendor"]
        }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setLoading(false);
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
        alert(error.message);
        throw error;
      }
};
useEffect(() => {
    fetchUsers();
}, []);

  const handleAction = async (action, userId, toCollection) => {
    setLoading(true);
    if(action === "accept"){
        try {
            const response = await axios.post(`${backendURL}/api/verify/move-user`, {
              userId,
              toCollection
            });
            setLoading(false);
            alert(response.data.message);
            fetchUsers();
          } catch (error) {
            console.error('Error moving user:', error);
            setLoading(false);
            alert(error.message);
            throw error;
          }
    }

  };
  return (
    <div className="complaint-list">
      <h2>Users List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
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
            {users.map((user) => (
              <tr
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button>
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


export default UserList;
