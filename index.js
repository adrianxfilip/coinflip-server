const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");

var rooms = {};

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  socket.emit("rooms", rooms);
  socket.emit("connected");

  socket.on("disconnect", () => {
    delete rooms[socket.id];
    socketIO.emit("rooms", rooms);
  });

  socket.on("create-room", (roomData) => {
    rooms = {
      ...rooms,
      [socket.id]: {
        betAmount: roomData.betAmount,
        players: { [socket.id] : { side: roomData.side }},
      },
    };
    socketIO.emit("rooms", rooms);
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
