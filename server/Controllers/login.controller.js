// Importing package for dcrypting password and making cookie 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Importing model
const userModel = require("../models/user.model")

// Function for make user login 
const loginUser = async (req,res)=> {
  try {
    // Dstructring data from body 
    const {userName, password} = req.body
    // Cheching weather Credential has come or not 
    if(!userName || !password) {
      return res.json({
        sucess : false,
        status : 401,
        message : "Credentials missing!"
      })
    }
    // Checking for user existence 
    const userForLogin = await userModel.findOne({userName : userName})
    if(!userForLogin){
      return res.json({
        sucess : false,
        status : 403,
        message : "User not found!"
      })
    }else {
      // password dcrypting and veryfing 
      bcrypt.compare(password, userForLogin.password,async(errr,result)=> {
        if(!result){
          return res.json({
            sucess : false,
            status : 401,
            message : "Password is wrong!"
          })
        }else {
          const loggedInUserFinalData = await userModel.findOne({_id : userForLogin._id}).select('-password')
          const cookieForClient = await jwt.sign({email : userForLogin.email}, process.env.JWT_SECREAT)
          // Sending cookie for client 
          res.cookie('token', cookieForClient)
          // Now sending final loggedin user data 
          res.json({
            sucess : true,
            status : 203,
            message : "Logged in sucessfull!",
            user : loggedInUserFinalData
          })
        }
      })
    }
    
  } catch (error) {
    console.log(error)
   return res.json({
      sucess : false,
      status : 403,
      message : "Internal server error!",
      error
    })
  }
} 




// Exporting function
module.exports = loginUser