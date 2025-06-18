import { createContext, useState } from "react";

export const OtherDataContext = createContext({})
export const OtherDataContextProvider = ({children})=> {
  const [recieverId, setrecieverId] = useState()
  // chat images priview 
  const [allChatImages, setallChatImages] = useState([])

  return (
    <OtherDataContext.Provider value={{recieverId,setrecieverId}}>
      {children}
    </OtherDataContext.Provider>
  )
}