"use client";

import { Card } from "@prisma/client";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import RealtimeListener from "../components/RealtimeListener";
import Scoreboard from "../components/Scoreboard";
import {
  generateCards,
  getGeneratedCards,
  resetActiveCards,
} from "./actions/cardActions";
import { clearUsers, getUsers, registerUser } from "./actions/userActions";

interface UserData {
  id: string;
  name: string;
  team: boolean;
  spyMaster: boolean;
  isAdmin: boolean;
}

export default function HomePage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      const initialUsers = await getUsers();
      setUsers(initialUsers);

      const activeCards = await getGeneratedCards();

      if (activeCards.length === 0) {
        const generatedCards = await generateCards();
        setCards(generatedCards);
      } else {
        setCards(activeCards);
      }
    }

    // Check for user data in localStorage
    const localUserData = localStorage.getItem("userData");
    if (localUserData) {
      const userData: UserData = JSON.parse(localUserData);
      setIsRegistered(true);
      setName(userData.name);
    }

    loadUsers();
  }, [cards.length]);

  const handleUsersUpdated = (newUsers: UserData[] | UserData) => {
    const usersArray = Array.isArray(newUsers) ? newUsers : [newUsers];
    setUsers((prevUsers) => {
      const updatedUsersMap = new Map(prevUsers.map((user) => [user.id, user]));
      usersArray.forEach((user) => updatedUsersMap.set(user.id, user));
      return Array.from(updatedUsersMap.values());
    });
  };

  const handleCardsUpdated = (newCards: Card[]) => {
    const cardArray = Array.isArray(newCards) ? newCards : [newCards];
    setCards((prevCards) => {
      const updatedCardsMap = new Map(prevCards.map((card) => [card.id, card]));
      cardArray.forEach((card) => updatedCardsMap.set(card.id, card));
      return Array.from(updatedCardsMap.values());
    });
  };

  const handleTeamPointsUpdated = (team: boolean, points: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.team === team) {
          return { ...user, points };
        }
        return user;
      })
    );
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
      localStorage.setItem("userData", JSON.stringify(newUser)); // Update localStorage with new user data
      setIsAdmin(newUser.isAdmin);
    }
  };

  const clearUser = async () => {
    await clearUsers();
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  const clearCards = async () => {
    await resetActiveCards();
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  console.log(cards);

  return (
    <div>
      {!isRegistered ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div>
          <h1>Registered Users</h1>
          <Scoreboard />
          {users.map((user) => (
            <div key={user.id}>
              <p>
                {user.name} - Team: {user.team ? "Red" : "Blue"} - SpyMaster:{" "}
                {user.spyMaster ? "Yes" : "No"}
                {user.isAdmin && (
                  <button onClick={clearUser}>Clear All Users</button>
                )}
              </p>
              <button onClick={clearCards}>Do it</button>
            </div>
          ))}
          <Cards cards={cards} />
        </div>
      )}
      <RealtimeListener
        onUsersUpdated={handleUsersUpdated}
        onCardsCreate={handleCardsUpdated}
      />
    </div>
  );
}
