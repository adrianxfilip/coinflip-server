const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");

var rooms = {
  room1: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room2: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room3: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room4: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room5: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room6: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room7: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room8: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room9: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
  room10: {
    playerOne: {
      id: "",
      side: "",
    },
    playerTwo: {
      id: "",
      side: "",
    },
    bet: 0,
    status: "closed",
    winningSide: "",
  },
};

var chat = []

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  socket.emit("connected", rooms, chat, socket.id);
  socketIO.emit("clients-count-update", socketIO.engine.clientsCount)

  socket.on("disconnect", () => {
    var returnAmount = 0;
    Object.keys(rooms).forEach((key) => {
      if (
        rooms[key].playerOne.id == socket.id &&
        rooms[key].status != "ongoing"
      ) {
        returnAmount += rooms[key].bet
        rooms[key] = {
          playerOne: {
            id: "",
            side: "",
          },
          playerTwo: {
            id: "",
            side: "",
          },
          bet: 0,
          status: "closed",
          winningSide: "",
        };
      }
    });
    socketIO.emit("rooms", rooms);
    socketIO.emit("clients-count-update", socketIO.engine.clientsCount)
    socket.emit("balanceUpdate", returnAmount)
  });

  socket.on("create-room", (roomData) => {
    var newBalance = 0
    var roomCount = 0
    Object.keys(rooms).every((key) => {
      if (rooms[key].playerOne.id == socket.id){
        roomCount = roomCount + 1
        if(roomCount >= 5){
          return false
        }
      }
      if (rooms[key].status == "closed") {
        rooms[key] = {
          playerOne: {
            id: socket.id,
            side: roomData.side,
          },
          playerTwo: {
            id: "",
            side: "",
          },
          bet: parseFloat(roomData.betAmount).toFixed(2),
          status: "waiting",
          winningSide: "",
        };
        newBalance = parseFloat(roomData.betAmount).toFixed(2) * -1;
        return false;
      }
      return true;
    });
    if(roomCount <=5 ){
      socket.emit("balanceUpdate", newBalance);
      socketIO.emit("rooms", rooms);
    }
  });

  socket.on("join-room", (roomID) => {
    const sides = ["heads", "tails"]
    const winningSide = sides[(Math.floor(Math.random() * sides.length))];
    rooms[roomID] = {
      ...rooms[roomID],
      playerTwo: {
        id: socket.id,
        side: rooms[roomID].playerOne.side == "heads" ? "tails" : "heads",
      },
      status: "ongoing",
      winningSide: winningSide,
    };
    socket.emit("balanceUpdate", rooms[roomID].bet * -1)
    var balancePlayerOne =
    winningSide != rooms[roomID].playerOne.side
      ? 0
      : rooms[roomID].bet * 2 - (10 / 100) * rooms[roomID].bet;
    var balancePlayerTwo =
      winningSide != rooms[roomID].playerTwo.side
        ? 0
        : rooms[roomID].bet * 2 - (10 / 100) * rooms[roomID].bet;
    socketIO.emit("rooms", rooms);
    setTimeout(() => {
      socketIO
        .to(rooms[roomID].playerTwo.id)
        .emit("balanceUpdate", balancePlayerTwo);
      socketIO
        .to(rooms[roomID].playerOne.id)
        .emit("balanceUpdate", balancePlayerOne);
      rooms[roomID] = {
        playerOne: {
          id: "",
          side: "",
        },
        playerTwo: {
          id: "",
          side: "",
        },
        bet: 0,
        status: "closed",
        winningSide: "",
      };
      socketIO.emit("rooms", rooms);
    }, 3500);
  });

  socket.on("new-message", (messageData) => {
    chat.unshift({name : messageData.name, message : messageData.message})
    if(chat.length > 30){
      chat.splice(30, 1)
    }
    socketIO.emit("chat-update", chat)
  })
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
