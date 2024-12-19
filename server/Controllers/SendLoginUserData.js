const userModel = require("../models/user.model");
const { use } = require("../Routes/user.route");

const loggedinUserData = async(req,res)=> {
  const {user} = req
  const loggedInUserData = await userModel.findOne({email : user.email}).select("-password")
  res.json({
    sucess : true,
    status : 200,
    user : loggedInUserData
  })
}

module.exports = loggedinUserData