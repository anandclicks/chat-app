const { Server } = require("socket.io");

const socketIoConnection = (server)=> {
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET"],
  },
});
return io
}


module.exports = socketIoConnection

