"use client";

import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { Substantiv } from "../../server/data";
import { User } from "../../server/interfaces";
import { socket } from "../socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [users, setUsers] = useState<User[]>([]);
  const [cards, setCards] = useState<Substantiv[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("cards", generateCards);
    // Listen for the "user" event
    socket.on("user", (users: User[]) => {
      setUsers(users);
      console.log(users); // Ensure users array is received
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("user");
    };
  }, []);

  const generateCards = (cards: Substantiv[]) => {
    setCards(cards);
  };

  const handleRegister = () => {
    const name = prompt("Enter your name");
    if (name) {
      socket.emit("setUser", name);
      setUsername(name);
    }
  };

  const handleSetSpymaster = (user: User[]) => {
    socket.emit("setSpymaster", user);
  };

  const handleCardClick = (ord: string) => {
    socket.emit("selectWord", ord);
  };

  return (
    <div className="App h-screen w-screen bg-gradient-to-r from-blue-400 to-red-400">
      <Dashboard
        users={users}
        username={username}
        cards={cards}
        handleCardClick={handleCardClick}
      />
      <div className="z-50 absolute bottom 0 text-white">
        <button onClick={handleRegister}>Register</button>

        <p>{isConnected ? "Connected" : "Not connected"}</p>
        <button onClick={() => handleSetSpymaster(users)}>
          Become Spymaster
        </button>
      </div>
    </div>
  );
}
