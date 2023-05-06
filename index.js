const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const path = require("path");
const port = 3000;
let messagehistory = [];
let usercount = 0;

app.use(express.static("public"));

app.get("/", (res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.listen(3100);

io.on("connection", (socket) => {
  usercount++;
  io.emit("usersonline", usercount);
  socket.emit("hello", messagehistory);
  socket.on("receivemsg", (msg) => {
    messagehistory.push(msg);
    io.emit("sendmsg", msg);
  });
  socket.on("disconnect", () => {
    usercount--;
    io.emit("usersonline", usercount);
  });
});
