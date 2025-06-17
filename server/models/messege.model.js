const mongoose = require("mongoose")

// Creating message model 
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
  isSeen : {
    type : Boolean,
    default : false
  },
  message : {
    type : String,
    default : null
  },
  images : {
    type: [String],
    default : []
  }
}, {timestamps : true})


module.exports = mongoose.model("chatModel", chatModel)