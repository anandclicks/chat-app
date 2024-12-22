const messegeModel = require("../models/messege.model")
const userModel = require("../models/user.model")



const handleChats = async(req,res)=> {
  const loggedInUser = req.user
  const recieverId = req.params.id
  if(!recieverId){
  return  res.json(({
      sucess : true,
      messeges : "No messege!",
      reciever : receiver,
      allChats : chatsBetweenTheme
    }))
  }
  // Fetching all chats between loggedin use and reciever user 
  const receiver = await userModel.findOne({_id : recieverId})
  const allChats = await messegeModel.find({})
  const chatsBetweenTheme = allChats.filter((item)=> item.senderId || item.recieverId == recieverId && item.senderId || item.recieverId == toString(loggedInUser._id))
  console.log(chatsBetweenTheme)
  res.json({
    sucess : true,
    messeges : "All messeges!",
    reciever : receiver,
    allChats : chatsBetweenTheme
  })
}



module.exports = handleChats