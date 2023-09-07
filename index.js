const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// connection           done
// disconnect           done
// chat message         done
// custom connection    pending
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// setting up the socket
io.on("connection", (socket) => {
  console.log("A new user connected");
  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  socket.on('custom connection',(data)=>{

    io.emit('custom connection',data)
  })

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(3000, () => {
  console.log("app is listening on https://localhost:" + 3000);
});
