const express = require("express");
const app = express();

// packages
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");
const connectDb = require("./db/db.connection");
const jwt = require("jsonwebtoken")
const cookie = require("cookie")

// Importing Routes handler 
const userRoute = require('./Routes/user.route');


// io 
const socketIoConnection = require("./socekt io/socekt.io");

// Middlewars
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET"],
  })
);


// Forwording request to routes controller 
app.use('/api/users',userRoute)


// Socket io event handling 
const server = http.createServer(app);
socketIoConnection(server)

// Online users data store 
let onlineUsers = []



// Database connection and server starting
const connectDbStartServer = async() => {
 await connectDb();
  server.listen(process.env.PORT, () => {
    console.log("Server is listning...");
  });
};

connectDbStartServer();
