import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { generateCards } from "./server/data";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  User,
} from "./server/interfaces";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  let users: User[] = [];

  let cards = generateCards();

  let redTeamPoints = 0;
  let blueTeamPoints = 0;

  const teampicker = () => {
    return users.length % 2 === 0;
  };

  io.on("connection", (socket) => {
    io.emit("user", users);
    io.emit("cards", cards);
    io.emit("points", { redTeamPoints, blueTeamPoints });
    socket.on("setUser", (name) => {
      socket.data.name = name;
      socket.data.team = teampicker();
      socket.data.spyMaster = false;
      users.push({
        id: socket.id,
        name,
        team: socket.data.team,
        spyMaster: socket.data.spyMaster,
      });
      console.log(users);
      io.emit("user", users);
    });

    socket.on("setSpymaster", (users: User[]) => {
      users = users.map((u) =>
        u.id === socket.id ? { ...u, spyMaster: true } : u
      );
      io.emit("user", users);
      console.log(users);
    });

    socket.on("selectWord", (selectedWord) => {
      const card = cards.find((c) => c.ord === selectedWord);
      if (card && !card.valt) {
        card.valt = true;
        if (card.color && socket.data.team) {
          redTeamPoints += 1;
        } else if (!card.color && !socket.data.team) {
          blueTeamPoints += 1;
        }
        io.emit("points", { redTeamPoints, blueTeamPoints });
        io.emit("cards", cards);
      }
    });

    console.log(users);
    io.emit("message", "User: " + socket.id + " joined the chat");

    console.log("A user connected");

    socket.on("disconnect", () => {
      users = users.filter((user) => user.id !== socket.id);
      io.emit("user", users);
      io.emit("message", `User: ${socket.data.name} left the chat`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
