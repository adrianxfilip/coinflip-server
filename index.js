const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const http = require("http").Server(app);
const cors = require("cors");

var roomTemplate = {    
  playerOne: {
    socketID: "",
    playerID: "",
    side: "",
    name : ""
  },
  playerTwo: {
    socketID: "",
    playerID: "",
    side: "",
    name : ""
  },
  bet: 0,
  status: "closed",
  winningSide: ""
}

var rooms = {
  room1: {
    ...roomTemplate
  },
  room2: {
    ...roomTemplate
  },
  room3: {
    ...roomTemplate
  },
  room4: {
    ...roomTemplate
  },
  room5: {
    ...roomTemplate
  },
  room6: {
    ...roomTemplate
  },
  room7: {
    ...roomTemplate
  },
  room8: {
    ...roomTemplate
  },
  room9: {
    ...roomTemplate
  },
  room10: {
    ...roomTemplate
  },
  room11: {
    ...roomTemplate
  },
  room12: {
    ...roomTemplate
  },
  room13: {
    ...roomTemplate
  },
  room14: {
    ...roomTemplate
  },
  room15: {
    ...roomTemplate
  },
  room16: {
    ...roomTemplate
  },
  room17: {
    ...roomTemplate
  },
  room18: {
    ...roomTemplate
  },
  room19: {
    ...roomTemplate
  },
  room20: {
    ...roomTemplate
  }
};

var chat = [];

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  socket.emit("connected", rooms, chat, socketIO.engine.clientsCount, socket.id);
  socket.broadcast.emit("connected-users-update", socketIO.engine.clientsCount);

  socket.on("disconnect", () => {
    var hadOpenRooms = false
    Object.keys(rooms).forEach((room) => {
      if (
        rooms[room].playerOne.socketID == socket.id &&
        rooms[room].status != "ongoing"
      ) {
        hadOpenRooms = true
        rooms[room] = {
          ...roomTemplate
        };
      }
    });
    if(hadOpenRooms){
      socket.broadcast.emit("rooms-update", rooms);
    }
    socket.broadcast.emit("connected-users-update", socketIO.engine.clientsCount);
  });

  socket.on("create-room", (betData, userData) => {
    // for future update - current system allows for more than 5 rooms per player if there are closed rooms before the users open rooms 
    var roomCount = 0;
    Object.keys(rooms).every((room) => {
      if (rooms[room].playerOne.socketID == socket.id) {
        roomCount = roomCount + 1;
        if (roomCount >= 5) {
          return false;
        }
      }
      if (rooms[room].status == "closed") {
        rooms[room] = {
          ...rooms[room],
          playerOne: {
            playerID: userData.playerID,
            socketID : socket.id,
            side: betData.selectedSide,
            name: userData.name,
          },
          bet: parseFloat(betData.betAmount).toFixed(2),
          status: "waiting"
        };
        return false;
      }
      return true;
    });
    if (roomCount <= 5) {
      socket.emit("balance-update", parseFloat(betData.betAmount).toFixed(2) * -1);
      socketIO.emit("rooms-update", rooms);
    }
  });

  socket.on("join-room", (roomID, userData) => {
    const sides = ["heads", "tails"];
    const winningSide = sides[Math.floor(Math.random() * sides.length)];
    rooms[roomID] = {
      ...rooms[roomID],
      playerTwo: {
        socketID: socket.id,
        side: rooms[roomID].playerOne.side == "heads" ? "tails" : "heads",
        name: userData.name,
        playerID : userData.playerID
      },
      status: "ongoing",
      winningSide: winningSide,
    };
    socketIO.emit("rooms-update", rooms);
    socket.emit("balance-update", rooms[roomID].bet * -1);

    var balancePlayerOne =
      winningSide != rooms[roomID].playerOne.side
        ? 0
        : rooms[roomID].bet * 2 - (10 / 100) * rooms[roomID].bet;
    var balancePlayerTwo =
      winningSide != rooms[roomID].playerTwo.side
        ? 0
        : rooms[roomID].bet * 2 - (10 / 100) * rooms[roomID].bet;

    setTimeout(() => {
      socketIO
        .to(rooms[roomID].playerTwo.socketID)
        .emit("balance-update", balancePlayerTwo);
      socketIO
        .to(rooms[roomID].playerOne.socketID)
        .emit("balance-update", balancePlayerOne);
      rooms[roomID] = {
        ...roomTemplate
      };
      socketIO.emit("rooms-update", rooms);
    }, 5000);
  });

  socket.on("new-message", (messageData) => {
    chat.unshift({ username: messageData.username, message: messageData.message });
    if (chat.length > 30) {
      chat.splice(30, 1);
    }
    socketIO.emit("chat-update", chat);
  });

});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static("public"));
app.use("/views", express.static(__dirname + "/views"));

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
