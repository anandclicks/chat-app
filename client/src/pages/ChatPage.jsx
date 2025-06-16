import React, { useContext, useEffect, useState } from "react";
import AllUsers from "../components/AllUsers";
import MessegeInput from "../components/MessegeInput";
import SendMag from "../components/SendMag";
import RecieveMsg from "../components/RecieveMsg";

import { useParams } from "react-router-dom";
import { OtherDataContext } from "../../scoektIoContext/OtherDataContext";
import { SocketIoContext } from "../../scoektIoContext/Socket.Io";
import { LoggedinUserContext } from "../../scoektIoContext/LoggdinUserContext";
import axios from "axios";
import { useRef } from "react";

const ChatPage = () => {
  const [chats, setchats] = useState([]);

  // Geeing id number of currecnt reciever user
  const { socket } = useContext(SocketIoContext);
  const { loggedinUser } = useContext(LoggedinUserContext);
  const { recieverId } = useContext(OtherDataContext);

  // Fetching chats
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

  useEffect(() => {
    socket.on("recieveMessege", (payload) => {
      setchats((prev) => [...prev, payload]);
    });
    return () => {
      socket.off("recieveMessege", console.log("cleanup"));
    };
  }, []);

  const [selectedUserData, setselectedUserData] = useState([]);
  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/users/user/${recieverId}`,
        { withCredentials: true }
      );
      setselectedUserData(response.data.user);
    };
    if (recieverId) {
      apiCall();
    }
  }, [recieverId]);

  // Online user
  const [onlineUsers, setonlineUsers] = useState([]);
  useEffect(() => {
    socket.on("onlineUser", (payload) => {
      setonlineUsers(payload);
    });
    return () => {
      socket.off("onlineUser", console.log("hey"));
    };
  }, []);

  // screen scroll 
  const viewchatref = useRef(null);
  useEffect(() => {
    if (viewchatref.current) {
      viewchatref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-200">
      <div className="chatWrapper h-full max-w-[1300px] mx-auto pt-[100px] pb-[100px] flex gap-5">
        {/* left side  */}
        <div className="chatPageLeft w-[350px]">
          <AllUsers onlineUsers={onlineUsers} />
        </div>
        {/* right side  */}
        <div className="chatField w-[850px] h-full p-3 bg-white rounded-3xl flex flex-col justify-between relative">
          <div className="w-full h-[50px] flex gap-2 items-center">
            <img
              className="h-full rounded-full"
              src={`http://localhost:3000${selectedUserData?.profilePicture}`}
              alt=""
            />
            {/* chat header */}
            {recieverId && (
              <div>
                <h2>{selectedUserData?.name}</h2>
                {onlineUsers[selectedUserData.email] ? (
                  <p className="text-[13px] text-green-600">Online</p>
                ) : (
                  <p className="text-[13px] leading-3">Ofline</p>
                )}
              </div>
            )}
          </div>
          {/* if chtas are not there  */}
          {chats.length == 0 && (
            <div className=" w-full flex justify-center items-center absolute h-[60vh]">
              <img
                className="h-[200px] w-[200px] object-cover "
                src="http://localhost:3000/uploads/defaultProfile.png"
                alt=""
              />
            </div>
          )}
          {/* All messeges  */}

          <div className="chatsAndInput">
            <div className="allMsgswrapper h-[60vh] flex justify-end overflow-scroll">
              {chats?.length > 0 && (
                <div className="w-full allMsgs items-end flex-col flex">
                  {chats.map((item, index) => {
                    return item?.senderId === loggedinUser?._id ? (
                      <SendMag key={index} msgData={item} />
                    ) : (
                      <RecieveMsg key={index} msgData={item} />
                    );
                  })}
              <div ref={viewchatref} />
                </div>
              )}
            </div>

            {recieverId && <MessegeInput setchats={setchats} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
