const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const messageModel = require("../models/messege.model");

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

      jwt.verify(token, process.env.JWT_SECREAT, (err, decodedData) => {
        if (err) return next(new Error("Invalid token"));
        socket.email = decodedData.email;
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

    socket.on("sendMessege", async (payload) => {
      const { reciever, sender, messege } = payload;

      const recieverData = await userModel.findById(reciever);
      const senderData = await userModel.findById(sender);

      if (!recieverData || !senderData || !messege) return;

      const recieverEmail = recieverData.email;
      const recieverSocketId = onlineUsers[recieverEmail];

      if (recieverSocketId) {
        socket.to(recieverSocketId).emit("recieveMessege", payload);
      }

      const newMessage = await messageModel.create({
        senderId: sender,
        recieverId: reciever,
        messege,
      });

      recieverData.chats.push(newMessage);
      senderData.chats.push(newMessage);
      await recieverData.save();
      await senderData.save();
    });
  });
};

module.exports = socketIoConnection;
