const express = require("express")
const Router = express.Router()


// Importing controller 
const isUserAuthenticate = require("../Middlewares/user.auth")
const {handleChats} = require("../Controllers/chat.controller")


// Router.get('/getunreadmsg',isUserAuthenticate,sendUnreadMessages)
Router.get('/:id',isUserAuthenticate,handleChats)


module.exports = Router