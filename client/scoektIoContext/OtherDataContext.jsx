import { createContext, useEffect, useState } from "react";

export const OtherDataContext = createContext({})
export const OtherDataContextProvider = ({children})=> {
  const [recieverId, setrecieverId] = useState()
  // chat images priview 
  const [allChatImages, setallChatImages] = useState([])

  // state for showing images 
  const [needToShow, setneedToShow] = useState(false)
 useEffect(()=>{
   console.log(needToShow);
 },[needToShow])

//  all images to show 
  const [allInboxImages, setallInboxImages] = useState([]);

  
  return (
    <OtherDataContext.Provider value={{recieverId,setrecieverId,needToShow, setneedToShow,allInboxImages, setallInboxImages}}>
      {children}
    </OtherDataContext.Provider>
  )
}