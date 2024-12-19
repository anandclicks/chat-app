// importing model
const userModel = require("../models/user.model.js");

// Importing pakage for hashing password
const bcrypt = require("bcrypt");

const registerNewUser = async (req, res) => {
  try {
    // Dstructuring user all data
    const { name, email, userName, password } = req.body;
    // Checking weather complete data has come or not
    if (!name || !email || !userName || !password) {
      return res.json({
        sucess: false,
        status: 401,
        messege: "Credentials missing!",
      });
    }
    // Checking weater user alredy exist from that email or userName
    const findByEmail = await userModel.findOne({ email: email });
    const findByUsername = await userModel.findOne({ userName: userName });
    if (findByEmail || findByUsername) {
      return res.json({
        sucess: false,
        status: 403,
        messege: "User already exist! use diffent Email or userName",
      });
    } else {
      // Hashing password for users account
      bcrypt.genSalt(15, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hashedPaaword) => {
          const registeredUser = await userModel.create({
            name,
            email,
            userName,
            password: hashedPaaword,
          });
          if (!registerNewUser) {
            return res.json({
              sucess: false,
              status: 500,
              messege: "Something went wrong!",
            });
          } else {
            return res.json({
              sucess: true,
              status: 201,
              messege: "User registration sucessfull!",
              user: registeredUser,
            });
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      sucess: false,
      status: 500,
      messege: "Internal server errror!",
      error,
    });
  }
};


// Exporting function 
module.exports = registerNewUser