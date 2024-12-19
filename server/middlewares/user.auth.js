// Importing package for verifying client cookie 
const jwt = require("jsonwebtoken")

// Importing model 
const userModel = require("../models/user.model")

// Function for authenticate user 
const isUserAuthenticate = (req,res,next)=> {
  try {
    // Dstructring cookie 
    const {token} = req.cookies
    if(!token){
      return res.json({
        sucesss : false,
        status : 401,
        messege : "You need to login!"
      })
    }else {
    jwt.verify(token, process.env.JWT_SECREAT,async(err,decode)=> {
      if(!decode){
        return res.json({
          sucess : false,
          status : 401,
          messege : "Something is worng! you need to login!",
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
      messege : "Internal server error!"
    })
  }
}



// Exporing function 
module.exports = isUserAuthenticate