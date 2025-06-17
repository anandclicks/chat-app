// Importing package for verifying client cookie 
const jwt = require("jsonwebtoken")
const cookie = require("cookie")

const userModel = require("../models/user.model")

const isUserAuthenticate = (req,res,next)=> {
  try {
    // Dstructring cookie 
    let {token} = req.cookies
    console.log("is atuh cookie",token)
    
    if(!token){
      return res.json({
        sucesss : false,
        status : 401,
        message : "You need to login!"
      })
    }else {
    jwt.verify(token, process.env.JWT_SECREAT,async(err,decode)=> {
      if(!decode){
        return res.json({
          sucess : false,
          status : 401,
          message : "Something is worng! you need to login!",
        })
      } else {
        const user = await userModel.findOne({email : decode.email}).select('-password')
        req.user = user
        next()
      }
    })
    }
  } catch (error) {
    console.log(error)
    res.json({
      sucesss : false,
      status : 500,
      message : "Internal server error!"
    })
  }
}



// Exporing function 
module.exports = isUserAuthenticate