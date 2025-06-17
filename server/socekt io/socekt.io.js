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


  // Middleware to authenticate socket connection
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.token;
      if (!token) return next(new Error("Not authenticated"));

      jwt.verify(token, process.env.JWT_SECREAT, async (err, decodedData) => {
        if (err) return next(new Error("Invalid token"));

        const connectedUser = await userModel
          .findOne({ email: decodedData.email })
          .select("-password -chats");


        if (!connectedUser) return next(new Error("User not found"));
        socket.email = decodedData.email;
        socket.connectedUser = connectedUser;

        const existingSocketId = onlineUsers[socket.email];
        if (existingSocketId && existingSocketId !== socket.id) {
          io.to(existingSocketId).disconnectSockets(true);
        }
        onlineUsers[socket.email] = socket.id;
        next();
      });
    } catch (err) {
      next(new Error("Auth error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.email}`);
    io.emit("onlineUser", onlineUsers);

    socket.on("disconnect", () => {
      if (socket.email && onlineUsers[socket.email]) {
        delete onlineUsers[socket.email];
        io.emit("onlineUser", onlineUsers);
        console.log(`User disconnected: ${socket.email}`);
      }
    });

    // Handle send message
    socket.on("sendmessage", async (payload) => {
      const { reciever, sender, message } = payload;
      if (!reciever || !sender || !message) return;

      try {
        const [recieverData, senderData] = await Promise.all([
          userModel.findById(reciever),
          userModel.findById(sender),
        ]);

        if (!recieverData || !senderData) return;
        const recieverEmail = recieverData.email;
        const recieverSocketId = onlineUsers[recieverEmail];

        // Emit to recipient if online
        if (recieverSocketId) {
          console.log("sending msg to",recieverSocketId);
          
          socket.to(recieverSocketId).emit("recievemessage", payload);
        }

        // Save message to DB
        const newMessage = await messegeModel.create({
          senderId: sender,
          recieverId: reciever,
          message,
        });

        recieverData.chats.push(newMessage);
        senderData.chats.push(newMessage);
        await Promise.all([recieverData.save(), senderData.save()]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });
};

module.exports = socketIoConnection;
