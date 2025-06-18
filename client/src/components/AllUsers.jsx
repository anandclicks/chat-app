import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { SocketIoContext } from "../../scoektIoContext/Socket.Io";
import { LoggedinUserContext } from "../../scoektIoContext/LoggdinUserContext";
import { OtherDataContext } from "../../scoektIoContext/OtherDataContext";

const AllUsers = ({ onlineUsers }) => {
  const { socket } = useContext(SocketIoContext);
  const { loggedinUser, setloggedinUser } = useContext(LoggedinUserContext);
  const { setrecieverId } = useContext(OtherDataContext);
  const [redirect, setRedirect] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/loggedin-user-data", {
          withCredentials: true,
        });
        if (res.data.sucess) {
          setloggedinUser(res.data.user);
        } else {
          setRedirect(true);
        }
      } catch (err) {
        console.error("Error fetching logged-in user:", err);
        setRedirect(true);
      }
    };
    fetchUser();
  }, []);




  // Redirect if not logged in
  useEffect(() => {
    if (redirect) navigate("/");
  }, [redirect, navigate]);




  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/all-users");
        setAllUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching all users:", err);
      }
    };
    fetchAllUsers();
  }, [onlineUsers]); 





  // Listen to socket events
  useEffect(() => {
    if (!socket) return;
    const handleReceiveMsg = (payload) => {
      console.log("Message received:", payload);
    };

    socket.on("recieveMsg", handleReceiveMsg);

    return () => {
      socket.off("recieveMsg", handleReceiveMsg);
    };
  }, [socket]);




  return (
    <div className="flex flex-col h-full p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl font-['Inter',sans-serif] text-gray-900">
      {/* Search Box */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-100 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
        />
      </div>

      {/* Users List */}
      <div className="flex-1 rounded-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {allUsers.map((user) =>
          user._id !== loggedinUser?._id ? (
            <div
              key={user._id}
              onClick={() => setrecieverId(user._id)}
              className="flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-indigo-50/30 transition-all duration-200 border-b border-gray-100/50 last:border-b-0"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-sm">
                <span className="text-lg text-indigo-600">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-sm tracking-tight">{user.name}</h2>
                {onlineUsers[user.email] ? (
                  <p className="text-xs text-green-500">Online</p>
                ) : (
                  <p className="text-xs text-gray-500 truncate font-light">{user?.greet}</p>
                )}
              </div>
              <div className="text-xs text-gray-400 font-light">{user.lastSeen}</div>
            </div>
          ) : null
        )}
      </div>

      {/* Logged-in User */}
      <div className="flex items-center justify-between p-4 mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-sm">
            <span className="text-sm text-indigo-600">
              {loggedinUser?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <h2 className="text-sm tracking-tight">{loggedinUser?.name}</h2>
        </div>
        <Link to="/">
          <svg className="w-5 h-5 text-gray-500 hover:text-indigo-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default AllUsers;
