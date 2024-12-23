const userModel = require("../models/user.model")

const sendUserDataById = async(req,res)=> {
  const userId = req.params.id
  if(userId){
    const userData = await userModel.findOne({_id : userId})
    if(userData){
      res.json({
        sucess : true,
        status : 200,
        user : userData
      })
    }
  }
}


module.exports = sendUserDataById