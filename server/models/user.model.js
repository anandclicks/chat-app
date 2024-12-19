const mongoose = require('mongoose')

// Creating users schema 
const userModel = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  userName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    require : true
  },
  profilePicture : {
    type : String,
  },
  profilePicture : {
    type : String,
    default : "/uploads/defaultProfile.png"
  },
  greet : {
    type : String,
    default : "Hi there, How are you?"
  },
  chats : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "messegeModel"
    }
  ]
})

module.exports = mongoose.model("userModel", userModel)