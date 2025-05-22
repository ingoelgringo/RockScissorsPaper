const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3000;

const MessageModel = require("./models/messageModel");

const connectionMongoDB = require("./connectionMongoDB");
connectionMongoDB();

app.use(express.static("public"));

let players = [];

io.on("connection", (socket) => {
  console.log(`A client with id ${socket.id} connected to the game`);

  socket.on("login", (playerName) => {
    players.push({
      playerId: socket.id,
      playerName: playerName,
      handPlayed: null,
      wins: 0,
      losses: 0,
    });
  });

  // funktionalitet för att skicka svar när båda spelarna gjort sitt val
  socket.on("showHand", (hand) => {
    function findPlayer(obj) {
      return obj.playerId === socket.id;
    }
    let index = players.findIndex(findPlayer);
    players[index].handPlayed = hand;
    console.log(players);

    if (players[0].handPlayed && players[1].handPlayed) {
      let winner = checkWinner(players);
      console.log("Winner: ", winner);
      io.emit("result", winner);
      players.forEach((player) => (player.handPlayed = null));
      console.log("After hands are nulled: ", players);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} left the game`);
    // delete playersId[socket.id];
    // console.log(playersId);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server is running at http:localhost:${port}/`);
});

function checkWinner(players) {
  let p1 = players[0];
  let p2 = players[1];
  let outcome;

  if (p1.handPlayed === p2.handPlayed) {
    outcome = [
      p1.playerName + " played " + p1.handPlayed,
      p2.playerName + " played " + p2.handPlayed,
      "It's a draw",
    ];
  } else if (
    (p1.handPlayed === "paper" && p2.handPlayed === "rock") ||
    (p1.handPlayed === "rock" && p2.handPlayed === "scissors") ||
    (p1.handPlayed === "scissors" && p2.handPlayed === "paper")
  ) {
    outcome = [
      p1.playerName + " played " + p1.handPlayed,
      p2.playerName + " played " + p2.handPlayed,
      p1.playerName + " wins this round",
    ];
    players[0].wins++;
    players[1].losses++;
  } else {
    outcome = [
      p1.playerName + " played " + p1.handPlayed,
      p2.playerName + " played " + p2.handPlayed,
      p2.playerName + " wins this round",
    ];
    players[1].wins++;
    players[0].losses++;
  }
  return outcome;
}
