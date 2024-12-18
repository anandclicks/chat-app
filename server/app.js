const express = require("express")
const app = express()

// packages 
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {Server} = require('socket.io')
const http = require('http');
const path = require("path");

// Middlewars 
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({
  origin : 'http://localhost:5173',
  credentials : true,
  methods : ['POST','GET']
}))

// Socket io server creation 
const server = http.createServer(app)
const io = new Server(server,{
  cors : {
    origin : 'http://localhost:5173',
  credentials : true,
  methods : ['POST','GET']
  }
})



io.on('connection',socket=> {
    console.log("One user connected", socket.id)
    io.emit("newMsg", {messege : "New user connected"})
})



server.listen(process.env.PORT,()=> {
  console.log("Server is listning..")
})