const { Server } = require("socket.io");
const cookie = require('cookie')
const jwt = require('jsonwebtoken')

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
  io.use(async(socekt,next)=> {
    if(typeof socekt.handshake.headers.cookie == "string"){
      const {token} = cookie.parse(socekt.handshake.headers.cookie )
    // decrypting token to get data 
    jwt.verify(token, process.env.JWT_SECREAT,(err,decodedData)=> {
      if(decodedData){
        socekt.user = decodedData.email
        // Sending this user into onlineUsers array 
        const isUserAlreadyOnline = onlineUsers.find((item)=> item.email == socekt.user)
        if(!isUserAlreadyOnline){
          onlineUsers.push({email : socekt.user , socketId : socekt.id})
        }
        next()
      }
    })
    }
  })
  // Listner for removing user forn online users array in case of disconnection
  
 io.on("connection",(socekt)=> {
  // Adding user into online user array 
  const isUserAlreadyOnline = onlineUsers.find((item)=> item.socketId == socekt.socketId )
  if(!isUserAlreadyOnline){
    onlineUsers.push({email : socekt.user, socketId : socekt.id})
    console.log("one user connected")
   console.log("Online Users:", onlineUsers);
   socekt.emit("onlineUser", onlineUsers)
  }
  socekt.on("disconnecting",()=> {
    // Sending this user into onlineUsers array 
    const isUserAlreadyOnline = onlineUsers.find((item)=> item.socketId == socekt.socketId)
    if(!isUserAlreadyOnline){
      onlineUsers = onlineUsers.filter((item)=> item.socketId !== socekt.id)
    }
   console.log("one user disconnected")
   console.log("Online Users:", onlineUsers);
   socekt.emit("onlineUser", onlineUsers)
 })
 })
};


module.exports = socketIoConnection

