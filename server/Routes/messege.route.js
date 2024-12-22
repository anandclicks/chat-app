const express = require("express")
const Router = express.Router()


// Importing controller 
const isUserAuthenticate = require("../Middlewares/user.auth")
const handleChats = require("../controllers/chat.controller")


Router.get('/:id',isUserAuthenticate,handleChats)


module.exports = Router