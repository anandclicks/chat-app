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
  const chatsBetweenTheme = await messegeModel.find({
      $or: [
        { senderId: loggedInUser._id, recieverId: recieverId },
        { senderId: recieverId, recieverId: loggedInUser._id },
      ],
    });
  res.json({
    sucess : true,
    messeges : "All messeges!",
    reciever : receiver,
    allChats : chatsBetweenTheme
  })
}


// const sendUnreadMessages = async (req, res) => {
//   const loggedInUser = req.user;
//   // all unread messages
//   const unreadMsgs = await messegeModel.find({
//     isSeen: false,
//     recieverId: loggedInUser._id,
//   });

//   if (!unreadMsgs) {
//     return res.json({
//       success: true,
//       message: unreadMsgs,
//     });
//   }
//   return res.json({
//     success: true,
//     message: unreadMsgs,
//   });
// };


module.exports = {handleChats}