const express = require("express")
const Router = express.Router()

// Importing auth middleware and controllers
const registerNewUser = require("../controllers/register.controller")
const loginUser = require('../controllers/login.controller')
const isUserAuthenticate = require("../Middlewares/user.auth")
const {sendAllUsersList,loguot} = require("../controllers/AllUsers.controller")
const loggedinUserData = require("../controllers/SendLoginUserData")
const sendUserDataById = require("../controllers/sendingUserById")


// Managing routes 
Router.post('/user-registration',registerNewUser)
Router.post('/user-login',loginUser)
Router.get('/loggedin-user-data',isUserAuthenticate,loggedinUserData)
Router.get('/all-users',sendAllUsersList)
Router.get('/user/:id', isUserAuthenticate, sendUserDataById)
Router.get('/logout',isUserAuthenticate,loguot)


module.exports = Router