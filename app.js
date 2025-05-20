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

server.listen(port, () => {
  console.log(`Socket.IO server is running at http:localhost:${port}/`);
});
