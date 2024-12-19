const mongoose = require("mongoose")

// Creating messege model 
const chatModel = new mongoose.Schema({
  senderId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "userModel",
    required : true
  },
  recieverId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "userModel",
    required : true
  },
  messege : {
    type : String,
    required : true
  },
}, {timestamps : true})


module.exports = mongoose.model("chatModel", chatModel)