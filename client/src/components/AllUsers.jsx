import React, { useContext, useEffect, useState } from "react";
import { SocketIoContext } from "../../scoektIoContext/Socket.Io";
import axios from "axios";
import { LoggedinUserContext } from "../../scoektIoContext/LoggdinUserContext";
import { Link, useNavigate } from "react-router-dom";

const AllUsers = () => {
  // Use state for redirection
  const [redirect, setredirect] = useState(false);
  // api call for getting data of loggedin user
  const { setloggedinUser, loggedinUser } = useContext(LoggedinUserContext);
  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/users/loggedin-user-data",
        { withCredentials: true }
      );
      if (response.data.sucess) {
        setloggedinUser(response.data.user);
      }
      if (!response.data.sucess) {
        setredirect(true);
      }
    };
    apiCall();
  }, []);



  // listining socket for online user data
  const { socket } = useContext(SocketIoContext);
  const [onlineUsers, setonlineUsers] = useState([]);
  socket.on("onlineUser", (payload) => {
    setonlineUsers(payload.onlineUsers);
  });




  // Api call for all users
  const [allUsers, setallUsers] = useState([]);
  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/users/all-users"
      );
      setallUsers(() => response.data.users);
    };
    apiCall();
  }, []);




  // Redirection
  const navigate = useNavigate();
  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect]);



  return (
    <div className="w-full flex flex-col gap-5 h-[100%]">
      {/* search box  */}
      <div className="searachBox bg-white h-[50px] w-full rounded-3xl text-[15px] flex items-center overflow-hidden gap-2 px-3">
        <i className="ri-search-line"></i>
        <input
          className="placeholder-black h-full outline-none "
          placeholder="Search"
          type="text"
        />
      </div>

      {/* users  */}
      <div className="w-full bg-white rounded-3xl px-5 py-3 h-[100%]">
        {allUsers?.map((item, index) => (
         <div key={index}>
          {item._id !== loggedinUser._id && (
             <Link to={`chat/${item._id}`}
             key={index}
             className="h-[70px] w-full flex py-[10px] gap-2 items-center border-b-[1px] border-stone-200 cursor-pointer"
           >
             {/* profile picture  */}
             <div className="profilePicture h-full w-[50px] rounded-full overflow-hidden relative z-0">
               <img
                 className="h-full w-full object-cover"
                 src={`http://localhost:3000${item?.profilePicture}`}
                 alt=""
               />
             </div>
             {/* name and greet  */}
             <div className="nameAndGreet h-full w-[60%] flex flex-col justify-center">
               <h2 className="leading-5">{item.name}</h2>
               {onlineUsers.find((user) => user.email === item.email) ? (
                 <p className="text-[13px] text-green-600">Online</p>
               ) : (
                 <p className="text-[13px] text-stone-600">{item?.greet}</p>
               )}
             </div>
 
             {/* last seen  */}
             <div className="h-full">
               <p className="text-[12px]">{item.lastSeen}</p>
             </div>
           </Link>
          )}
         </div>
        ))}
      </div>

      {/* loggedin user  */}
      <div className="h-[60px] w-full bg-white rounded-3xl flex items-center justify-between px-2">
        {/* prfilepic and name  */}
        <div className="profuleAndName flex gap-2 items-center">
          <img
            className="h-[40px] w-[40px] rounded-full object-cover"
            src={`http://localhost:3000${loggedinUser.profilePicture}`}
            alt=""
          />
          <h2 className="text-sm">{loggedinUser.name}</h2>
        </div>
        {/* setting icon  */}
        <i className="ri-logout-circle-r-line text-xl cursor-pointer"></i>
      </div>
    </div>
  );
};

export default AllUsers;
