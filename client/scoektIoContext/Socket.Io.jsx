import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { LoggedinUserContext } from "./LoggdinUserContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const SocketIoContext = createContext({});
export const SocketIoContextProvider = ({ children }) => {
  const { loggedinUser } = useContext(LoggedinUserContext);
  // socket connection
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  // online users list
  const [onlineUsers, setonlineUsers] = useState([]);
  useEffect(() => {
    const handleOnlineUser = (payload) => {
      setonlineUsers(payload)
    }
    socket.on("onlineUser", handleOnlineUser);

    return () => {
      socket.off("onlineUsers",handleOnlineUser)
    }
  }, []);


  return (
    <SocketIoContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketIoContext.Provider>
  );
};
