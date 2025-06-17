import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketIoContext = createContext({});
export const SocketIoContextProvider = ({ children }) => {
  // socket connection 
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });



  // online users list 
  const [onlineUsers, setonlineUsers] = useState([]);
  socket.on("onlineUser", (payload) => {
    console.log(payload);
    setonlineUsers(payload);
  });



  return (
    <SocketIoContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketIoContext.Provider>
  );
};
