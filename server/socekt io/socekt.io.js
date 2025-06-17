const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const messegeModel = require("../models/messege.model");

let onlineUsers = {};

const socketIoConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.token;

      if (!token) return next(new Error("Not authenticated"));

      jwt.verify(token, process.env.JWT_SECREAT, async (err, decodedData) => {
        if (err) return next(new Error("Invalid token"));
        let connectedUser = await userModel
          .findOne({
            email: decodedData.email,
          })
          .select("-password -chats");

        socket.email = decodedData.email;
        socket.connectedUser = connectedUser;
        next();
      });
    } catch (err) {
      next(new Error("Auth error"));
    }
  });

  io.on("connection", (socket) => {
    if (socket.email && !onlineUsers[socket.email]) {
      onlineUsers[socket.email] = socket.id;
      io.emit("onlineUser", onlineUsers);
      console.log("Connected:", onlineUsers);
    }

    socket.on("disconnecting", () => {
      if (socket.email && onlineUsers[socket.email]) {
        delete onlineUsers[socket.email];
        io.emit("onlineUser", onlineUsers);
        console.log("Disconnected:", onlineUsers);
      }
    });
    // Handle send message request
    socket.on("sendmessage", async (payload) => {
      
      const { reciever, sender, message } = payload;
      const recieverData = await userModel.findById(reciever);
      const senderData = await userModel.findById(sender);
      console.log("reciver",recieverData , "sender data", senderData , "message", message);
      
      if (!recieverData || !senderData || !message) return; 
      const recieverEmail = recieverData.email;
      const recieverSocketId = onlineUsers[recieverEmail];
      const loggedInUserScoketId = onlineUsers[socket.connectedUser.email];
      console.log("sending to", loggedInUserScoketId);

      // Handle recieve message request
      if (recieverSocketId) {
        socket.to(recieverSocketId).emit("recievemessage", payload);
      }


      // saving msg into database
      const newMessage = await messegeModel.create({
        senderId: sender,
        recieverId: reciever,
        message : message,
      });
      recieverData.chats.push(newMessage);
      senderData.chats.push(newMessage);
      await recieverData.save();
      await senderData.save();
    });
  });
};

module.exports = socketIoConnection;
