"use client";
import { Card } from "@prisma/client";
import { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import RealtimeListener from "../components/RealtimeListener";
import { generateCards, getGeneratedCards } from "./actions/cardActions";
import { getPoints } from "./actions/pointActions";
import { getUsers, registerUser } from "./actions/userActions";

interface UserData {
  id: string;
  name: string;
  team: boolean;
  spyMaster: boolean;
  isAdmin: boolean;
  isActive: boolean;
}

interface Points {
  bluePoints: number | 0;
  redPoints: number | 0;
}

export default function HomePage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [points, setPoints] = useState<Points>({ bluePoints: 0, redPoints: 0 });
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    async function loadStats() {
      const initialUsers = await getUsers();
      setUsers(initialUsers);

      const points = await getPoints();
      setPoints(points);

      const activeCards = await getGeneratedCards();

      if (activeCards.length === 0) {
        const generatedCards = await generateCards();
        setCards(generatedCards);
      } else {
        setCards(activeCards);
      }
    }

    const localUserData = localStorage.getItem("userData");
    if (localUserData) {
      const userData: UserData = JSON.parse(localUserData);
      setIsRegistered(true);
      setName(userData.name);
    }

    loadStats();
  }, []);

  const handleUsersUpdated = (newUsers: UserData[] | UserData) => {
    const usersArray = Array.isArray(newUsers) ? newUsers : [newUsers];
    setUsers((prevUsers) => {
      const updatedUsersMap = new Map(prevUsers.map((user) => [user.id, user]));
      usersArray.forEach((user) => updatedUsersMap.set(user.id, user));
      return Array.from(updatedUsersMap.values());
    });
  };

  const handleCardsUpdated = (newCards: Card[]) => {
    setCards((prevCards) => {
      const updatedCardsMap = new Map(prevCards.map((card) => [card.id, card]));
      newCards.forEach((card) => updatedCardsMap.set(card.id, card));
      return Array.from(updatedCardsMap.values());
    });
  };

  const handlePointsUpdated = (updatedPoints: Points) => {
    setPoints(updatedPoints);
  };

  const handleRegister = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    const newUser = await registerUser(name);
    if (newUser) {
      setIsRegistered(true);
      handleUsersUpdated(newUser);
      localStorage.setItem("userData", JSON.stringify(newUser));
    }
  };

  return (
    <div className="h-full">
      {!isRegistered ? (
        <div className="h-full">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <Dashboard users={users} cards={cards} points={points} />
      )}
      <RealtimeListener
        onUsersUpdated={handleUsersUpdated}
        onCardsCreate={handleCardsUpdated}
        handlePointsUpdated={handlePointsUpdated}
      />
    </div>
  );
}
