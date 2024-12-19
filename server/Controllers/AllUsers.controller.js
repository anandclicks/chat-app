const userModel = require("../models/user.model")

const sendAllUsersList = async(req,res)=>{
  const allUsers = await userModel.find().select("-password")
  if(allUsers) {
    res.json({
      sucess : true,
      status : 200,
      users : allUsers
    })
  }
}

module.exports = sendAllUsersList