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

const ChatPage = () => {
  const [chats, setchats] = useState([]);
  const [selectedUserData, setselectedUserData] = useState([]);
  const [onlineUsers, setonlineUsers] = useState([]);
  const { socket } = useContext(SocketIoContext);
  const { loggedinUser } = useContext(LoggedinUserContext);
  const { recieverId } = useContext(OtherDataContext);

  const viewchatref = useRef(null);

  // Fetch chats
  useEffect(() => {
    if (recieverId) {
      const fetchingChats = async () => {
        const response = await axios.get(
          `http://localhost:3000/api/chats/${recieverId}`,
          { withCredentials: true }
        );
        setchats(response.data?.allChats);
      };
      fetchingChats();
    }
  }, [recieverId]);



  // Incoming message listener
  useEffect(() => {
    const handleReceiveMessage = (payload) => {
      setchats((prev) => [...prev, payload]);
    };

    socket.on("recievemessage", handleReceiveMessage);
    return () => {
      socket.off("recievemessage", handleReceiveMessage);
    };
  }, [socket]);

  useEffect(()=>{
    console.log(chats);
  },[chats])



  // Fetch receiver data
  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/users/user/${recieverId}`,
        { withCredentials: true }
      );
      setselectedUserData(response.data.user);
    };
    if (recieverId) apiCall();
  }, [recieverId]);



  // Online user listener
  useEffect(() => {
    socket.on("onlineUser", (payload) => {
      setonlineUsers(payload);
    });
    return () => {
      socket.off("onlineUser", console.log("hey"));
    };
  }, []);


  // Auto scroll
  useEffect(() => {
    if (viewchatref.current) {
      viewchatref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);




  return (
    <div className="h-screen w-screen">
      <div className="chatWrapper h-full max-w-[1300px] mx-auto py-10 2xl:py-[100px] flex gap-5">
        {/* Left panel */}
        <div className="chatPageLeft w-[350px] shadow-lg rounded-3xl overflow-hidden">
          <AllUsers onlineUsers={onlineUsers} />
        </div>

        {/* Right panel */}
        <div className="chatField flex-1 h-full p-4 bg-white shadow-lg rounded-3xl flex flex-col justify-between relative">
          {/* Header */}
          <div className="w-full h-[50px] flex gap-3 items-center mb-2">
            {recieverId && (
              <>
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center shadow-sm">
                  <span className="text-sm text-indigo-600">
                    {selectedUserData?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold">{selectedUserData?.name}</h2>
                  {onlineUsers[selectedUserData.email] ? (
                    <p className="text-sm text-green-600">Online</p>
                  ) : (
                    <p className="text-sm text-gray-500">Offline</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* No chats placeholder */}
          {chats.length === 0 && (
            <div className="absolute inset-0 flex justify-center items-center h-[70vh]">
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
                    <SendMag key={index} msgData={item} />
                  ) : (
                    <RecieveMsg key={index} msgData={item} />
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
