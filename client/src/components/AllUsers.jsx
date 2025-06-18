import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { SocketIoContext } from "../../scoektIoContext/Socket.Io";
import { LoggedinUserContext } from "../../scoektIoContext/LoggdinUserContext";
import { OtherDataContext } from "../../scoektIoContext/OtherDataContext";

const AllUsers = ({ funAndData }) => {
  const {onlineUsers,setmobileChatOpen} = funAndData
  const { socket } = useContext(SocketIoContext);
  const { loggedinUser, setloggedinUser } = useContext(LoggedinUserContext);
  const { setrecieverId } = useContext(OtherDataContext);
  const [redirect, setRedirect] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchedUser, setsearchedUser] = useState([])
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
        setsearchedUser(res.data.users)
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


  // handle search 
  const [searchBox, setsearchBox] = useState('')
  const handleSerach = (evt) => {
    setsearchBox(evt.target.value)
    setsearchedUser(() => {
      return allUsers?.filter((user) => user.name.toLowerCase().includes((evt.target.value).toLowerCase()))
    })
  }


  // logout 
  const logout = async () => {
    const toastId = toast.loading("Processing...!")
    await axios.get("http://localhost:3000/api/users/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          toast.dismiss(toastId)
          toast.success(res.data.message)
          navigate('/')
        }
      })
      .catch((err) => {
        toast.error(err.data.message)
      })
  }


  return (
    <div className="flex flex-col h-full p-2 md:p-6 bg-white/90 backdrop-blur-xl md:rounded-3xl shadow-xl font-['Inter',sans-serif] text-gray-900">
        {/* logo  */}
        {/* <div className="flex items-center mb-3">
          <img className="h-[50px] object-contain" src="https://i.pinimg.com/474x/70/50/97/705097cfa8c786482828da8da6796751.jpg" alt="" />
        <div>
            <p className="leading-[10px]">A² Chat</p>
        </div>
        </div> */}
      {/* Search Box */}
      <div className="relative mb-5  md:mt-0">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 mainColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          value={searchBox}
          onInput={(evt) => handleSerach(evt)}
          type="text"
          placeholder="Search users..."
          className="w-full pl-12 pr-4 py-3 focus:outline-0  text-black rounded-2xl text-sm  placeholder-black ring-2  transition-all duration-300"
        />
      </div>

      {/* Users List */}
      <div className="flex-1  rounded-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent allUsersWrapper">
        {searchedUser && (
          <>
            {searchedUser.map((user) =>
              user._id !== loggedinUser?._id ? (
                <div
                  key={user._id}
                  onClick={() => {setrecieverId(user._id); setmobileChatOpen(true)}}
                  className="flex shadow mt-2 items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-indigo-50/30 transition-all duration-200 border-b border-gray-100/50 last:border-b-0"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br mainBgColor flex items-center justify-center shadow-sm">
                    <span className="text-lg text-white">
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
          </>
        )}

        {/* if user not found  */}
        {!searchedUser.length && (
          <div className="flex items-center justify-center">
            <img className="h-[30px]" src="https://cdn-icons-png.flaticon.com/512/10629/10629681.png" alt="" />
            <h2 className="text-sm">User "{searchBox}" Not Found!</h2>
          </div>
        )}
      </div>

      {/* Logged-in User */}
      <div className="left-0 w-full md:relative h-[60px] flex items-center justify-between p-4 mt-4 mainBgColor shadow-sm rounded-lg">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-sm text-white-600">
              {loggedinUser?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <h2 className="text-sm tracking-tight text-white">{loggedinUser?.name}</h2>
        </div>
        <div onClick={()=>logout()} >
          <svg className="cursor-pointer w-5 h-5 text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
