import { createContext, useState } from "react";

export const LoggedinUserContext = createContext({})
export const LoggedinUserContextProvider = ({children})=> {
  // Use state for storing logged in user data 
  const [loggedinUser, setloggedinUser] = useState([])
  
  return (
    <LoggedinUserContext.Provider value={{loggedinUser,setloggedinUser}}>
      {children}
    </LoggedinUserContext.Provider>
  )
}