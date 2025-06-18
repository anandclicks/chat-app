import React, { useContext, useEffect, useRef, useState } from "react";
import AllUsers from "../components/AllUsers";
import MessegeInput from "../components/MessegeInput";
import SendMag from "../components/SendMag";
import RecieveMsg from "../components/RecieveMsg";
import { useParams } from "react-router-dom";
import { OtherDataContext } from "../../scoektIoContext/OtherDataContext";
import { SocketIoContext } from "../../scoektIoContext/Socket.Io";
import { LoggedinUserContext } from "../../scoektIoContext/LoggdinUserContext";
import axios from "axios";
import ShowImageFullscreen from "../components/ShowImageFullscreen";

const ChatPage = () => {
  const [chats, setchats] = useState([]);
  const [selectedUserData, setselectedUserData] = useState([]);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [allInboxImages, setallInboxImages] = useState([]);
  const [mobileChatOpen, setmobileChatOpen] = useState(false)
  const { socket } = useContext(SocketIoContext);
  const { loggedinUser } = useContext(LoggedinUserContext);
  const { recieverId } = useContext(OtherDataContext);

  const viewchatref = useRef(null);

  //  Fetch chats
  useEffect(() => {
    const fetchingChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/chats/${recieverId}`,
          { withCredentials: true }
        );
        setchats(response.data?.allChats || []);
      } catch (err) {
        console.error("Failed to fetch chats", err);
      }
    };

    if (recieverId) {
      fetchingChats();
    }
  }, [recieverId]);




  // Fetch receiver data
  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/user/${recieverId}`,
          { withCredentials: true }
        );
        setselectedUserData(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    if (recieverId) apiCall();
  }, [recieverId]);




  //  Incoming message listener
  useEffect(() => {
    const handleReceiveMessage = (payload) => {
      setchats((prev) => [...prev, payload]);
    };

    socket.on("recievemessage", handleReceiveMessage);
    return () => {
      socket.off("recievemessage", handleReceiveMessage);
    };
  }, [socket]);



  //  Online user listener
  useEffect(() => {
    socket.on("onlineUser", (payload) => {
      setonlineUsers(payload);
    });
    return () => {
      socket.off("onlineUser", () => {});
    };
  }, []);




  //  Auto scroll
  useEffect(() => {
    if (viewchatref.current) {
      viewchatref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);


// online user handler 
useEffect(() => {
  if (!socket) return;
  const handleOnlineUserUpdate = (users) => {
    setonlineUsers(users);
  };

  socket.on("onlineUser", handleOnlineUserUpdate);

  return () => {
    socket.off("onlineUser", handleOnlineUserUpdate);
  };
}, [socket]);



  return (
    <div className="md:h-screen h-[100vh] w-screen">
      {/* Fullscreen image view */}
      <ShowImageFullscreen images={allInboxImages} />

      <div className="chatWrapper h-full w-full md:max-w-[1300px] mx-auto md:py-10 2xl:py-[100px] flex gap-5">
        {/* Left panel */}
        <div className="chatPageLeft w-full md:w-[350px] shadow-lg md:rounded-3xl overflow-hidden">
          <AllUsers funAndData={{onlineUsers,setmobileChatOpen}} />
        </div>

        {/* Right panel */}
        <div className={`md:relative fixed chatField ${mobileChatOpen ? 'right-0' : 'right-[-100%]'} md:right-0 transition-all md:flex-1 w-full h-full p-4 bg-white md:shadow-lg md:rounded-3xl flex flex-col justify-between`}>
          {/* Header */}
          <div className="w-full h-[50px] flex gap-3 items-center mb-2">
            {recieverId && (
              <>
                <i onClick={()=>setmobileChatOpen((prev)=> !prev)} className="md:hidden ri-arrow-left-line mainColor text-3xl"></i>
                <div className="h-12 w-12 rounded-full mainBgColor flex items-center justify-center shadow-sm">
                
                  <span className="text-2xl text-white">
                    {selectedUserData?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold">{selectedUserData?.name}</h2>
                  {onlineUsers[selectedUserData.email] ? (
                    <p className="text-sm text-green-500">Online</p>
                  ) : (
                    <p className="text-sm text-gray-500">Offline</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* No chats placeholder */}
          {chats.length === 0 && (
            <div className="absolute inset-0 flex justify-center items-center h-[70vh] mt-[15%]">
              <img
                className="h-[300px] w-[300px] object-cover"
                src="https://chatgen.ai/wp-content/uploads/2023/04/AI-chat-5.png"
                alt="No messages"
              />
            </div>
          )}

          {/* Chat messages and input */}
          <div className="flex flex-col justify-between h-[calc(100%-60px)]">
            <div className="allMsgswrapper flex-1 overflow-y-auto pr-2">
              <div className="w-full flex flex-col items-end">
                {chats.map((item, index) =>
                  item?.senderId === loggedinUser?._id ? (
                    <SendMag key={index} msgDataObj={{item,setallInboxImages}} />
                  ) : (
                    <RecieveMsg key={index} msgDataObj={{item,setallInboxImages}} />
                  )
                )}
                <div ref={viewchatref} />
              </div>
            </div>

            {/* Input */}
            {recieverId && <MessegeInput setchats={setchats} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
