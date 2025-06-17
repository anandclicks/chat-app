const uploads = require("../middlewares/multer");
const messegeModel = require("../models/messege.model");
const userModel = require("../models/user.model");

const handleChats = async (req, res) => {
  const loggedInUser = req.user;
  const recieverId = req.params.id;
  if (!recieverId) {
    return res.json({
      sucess: true,
      messeges: "No messege!",
      reciever: receiver,
      allChats: chatsBetweenTheme,
    });
  }
  // Fetching all chats between loggedin use and reciever user
  const receiver = await userModel.findOne({ _id: recieverId });
  const chatsBetweenTheme = await messegeModel.find({
    $or: [
      { senderId: loggedInUser._id, recieverId: recieverId },
      { senderId: recieverId, recieverId: loggedInUser._id },
    ],
  });
  res.json({
    sucess: true,
    messeges: "All messeges!",
    reciever: receiver,
    allChats: chatsBetweenTheme,
  });
};

const chatImagesHnadler = async (req, res) => {
  // all images urls
  
  let files = req?.files;
  let finalImageArray = []
  files.forEach(img => {
    finalImageArray.push(img.path)
  });
  if(!files) return null
  return res.json({
    success: true,
    images: finalImageArray,
  });
};

module.exports = { handleChats, chatImagesHnadler };
