const express = require("express")
const Router = express.Router()


// Importing controller 
const isUserAuthenticate = require("../Middlewares/user.auth")
const {handleChats,chatImagesHnadler} = require("../Controllers/chat.controller")
const uploads = require("../middlewares/multer")


// Router.get('/getunreadmsg',isUserAuthenticate,sendUnreadMessages)
Router.get('/:id',isUserAuthenticate,handleChats)
Router.post('/upload-images',uploads.array('images',8),isUserAuthenticate,chatImagesHnadler)


module.exports = Router