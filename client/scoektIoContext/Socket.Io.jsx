import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketIoContext = createContext({})
export const SocketIoContextProvider = ({children})=> {
  const socket = io('http://localhost:3000', {
    withCredentials : true,
  }) 
  return (
    <SocketIoContext.Provider value={{socket}}>
      {children}
    </SocketIoContext.Provider>
  )
}
