const { Server } = require("socket.io");
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")
const messegeModel = require("../models/messege.model")

let onlineUsers = []

const socketIoConnection = (server)=> {
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET"],
  },
});
// Authectication of loggedin user for showing online 

  // Authentication process 
  io.use(async(socket,next)=> {
    if(typeof socket.handshake.headers.cookie == "string"){
      const {token} = cookie.parse(socket.handshake.headers.cookie )
    // decrypting token to get data 
    jwt.verify(token, process.env.JWT_SECREAT,(err,decodedData)=> {
      if(decodedData){
        socket.user = decodedData.email
        // Sending this user into onlineUsers array 
        const isUserAlreadyOnline = onlineUsers.find((item)=> item.email == socket.user)
        if(!isUserAlreadyOnline){
          onlineUsers.push({email : socket.user , socketId : socket.id})
        }
        next()
      }
    })
    }
  })
  // Listner for removing user forn online users array in case of disconnection
  
 io.on("connection",(socket)=> {
  // Adding user into online user array 
  const isUserAlreadyOnline = onlineUsers.find((item)=> item.socketId == socket.socketId )
  if(!isUserAlreadyOnline){
    onlineUsers.push({email : socket.user, socketId : socket.id})
   socket.emit("onlineUser", onlineUsers)
  }
  socket.on("disconnecting",()=> {
    // Sending this user into onlineUsers array 
    const isUserAlreadyOnline = onlineUsers.find((item)=> item.socketId == socket.socketId)
    if(!isUserAlreadyOnline){
      onlineUsers = onlineUsers.filter((item)=> item.socketId !== socket.id)
    }
   socket.emit("onlineUser", onlineUsers)
 })
 // Listining for messege
  socket.on("sendMessege",async(payload)=> {
    const {reciever,sender,messege} = payload


    // databse user reffrecnce 
    const recieverOriginalData = await userModel.findOne({_id : reciever})
    const senderOriginalData = await userModel.findOne({_id : sender})

    // Getting socket id to send messege in realtime 
  const {socketId} = onlineUsers.find((item)=> item.email == recieverOriginalData.email)

    // sending messege 
    socket.to(socketId).emit("recieveMessege",payload)

    // Creating messege object and saving into messeges databse  
    if(reciever && sender && messege) {
      if(recieverOriginalData && senderOriginalData) {
        // creating and Saving messege into sender and reciever's messeges array 
        const newMessege = await messegeModel.create({
          senderId : sender,
          recieverId : reciever,
          messege,
        })
        // saving messeg into both account's messege array 
        recieverOriginalData.chats.push(newMessege)
        await recieverOriginalData.save()
        senderOriginalData.chats.push(newMessege)
        await senderOriginalData.save()
      }
    }
  })
 })
};


module.exports = socketIoConnection