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

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  socket.emit("connected", rooms, socket.id);

  socket.on("disconnect", () => {
    Object.keys(rooms).forEach((key) => {
      if (
        rooms[key].playerOne.id == socket.id &&
        rooms[key].status != "ongoing"
      ) {
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
  });

  socket.on("create-room", (roomData) => {
    Object.keys(rooms).every((key) => {
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
          bet: roomData.betAmount,
          status: "waiting",
          winningSide: "",
        };
        return false;
      }
      return true;
    });
    socketIO.emit("rooms", rooms);
  });

  socket.on("join-room", (roomID) => {
    const winningSide = Math.random() < 0.5 ? "heads" : "tails";
    rooms[roomID] = {
      ...rooms[roomID],
      playerTwo: {
        id: socket.id,
        side: rooms[roomID].playerOne.side == "heads" ? "tails" : "heads",
      },
      status: "ongoing",
      winningSide: winningSide,
    };
    var balancePlayerTwo =
      winningSide != rooms[roomID].playerTwo.side
        ? rooms[roomID].bet * -1
        : rooms[roomID].bet - (10 / 100) * rooms[roomID].bet;
    var balancePlayerOne =
      winningSide != rooms[roomID].playerOne.side
        ? rooms[roomID].bet * -1
        : rooms[roomID].bet - (10 / 100) * rooms[roomID].bet;
        console.log(rooms[roomID])
      console.log(balancePlayerOne)
    socketIO.emit("rooms", rooms);
    setTimeout(() => {
      socketIO.to(rooms[roomID].playerTwo.id).emit("balanceUpdate", balancePlayerTwo)
      socketIO.to(rooms[roomID].playerOne.id).emit("balanceUpdate", balancePlayerOne)
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
    }, 5000);
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
