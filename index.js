const express = require("express");
const app = express();
const PORT = 8080;
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
  room11: {
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
  room12: {
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
  room13: {
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
  room14: {
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
  room15: {
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
  room16: {
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
  room17: {
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
  room18: {
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
  room19: {
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
  room20: {
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
  room21: {
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
  room22: {
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
  room23: {
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
  room24: {
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
  room25: {
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
  room26: {
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
  room27: {
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
  room28: {
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
  room29: {
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
  room30: {
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
  room31: {
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
  room32: {
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
  room33: {
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
  room34: {
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
  room35: {
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
  room36: {
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
  room37: {
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
  room38: {
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
  room39: {
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
  room40: {
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
  room41: {
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
  room42: {
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
  room43: {
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
  room44: {
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
  room45: {
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
  room46: {
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
  room47: {
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
  room48: {
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
  room49: {
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
  room50: {
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
  }
};

var chat = []

app.use(cors());

app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) 

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*"
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
            name: roomData.userData.name
          },
          playerTwo: {
            id: "",
            side: "",
            name : ""
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

  socket.on("join-room", (roomData) => {
    roomID = roomData.roomID
    userData = roomData.userData
    const sides = ["heads", "tails"]
    const winningSide = sides[(Math.floor(Math.random() * sides.length))];
    rooms[roomID] = {
      ...rooms[roomID],
      playerTwo: {
        id: socket.id,
        side: rooms[roomID].playerOne.side == "heads" ? "tails" : "heads",
        name: userData.name
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
