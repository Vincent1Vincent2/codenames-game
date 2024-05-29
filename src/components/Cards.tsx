"use client";
import { Card } from "@prisma/client";
import { useEffect, useState } from "react";
import { User } from "../../server/interfaces";
import { handleCardClick } from "../app/actions/cardActions";
import { getPoints } from "../app/actions/pointActions";
import { fetchUserById } from "../app/actions/userActions";

interface PageProps {
  cards: Card[];
}

interface Points {
  bluePoints: number | 0;
  redPoints: number | 0;
}

export default function Cards({ cards }: PageProps) {
  const [lsUser, setLsUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState<Points>();

  useEffect(() => {
    const localUserData = localStorage.getItem("userData");
    console.log(localUserData);
    if (localUserData) {
      console.log("in");
      const parsedUserData: User = JSON.parse(localUserData);
      console.log(parsedUserData);
      setLsUser(parsedUserData);
    }
  }, []);

  useEffect(() => {
    async function getUser() {
      if (lsUser) {
        const user = await fetchUserById(lsUser.id);
        setUser(user);
      }
    }
    getUser();
  }, [lsUser]);

  async function cardClick(cardId: string, userId: string) {
    await handleCardClick(cardId, userId);
    const points = await getPoints();
    setPoints(points);
  }

  return (
    <div className="h-full w-3/4  flex items-center justify-center">
      <div className="grid grid-cols-5 grid-rows-5 place-items-center gap-5 mx-5 h-3/4 w-full">
        {cards.map((c) => (
          <button
            className="w-full h-full bg-neutral-100 flex justify-center items-center cards"
            key={c.id}
            onClick={() => user && cardClick(c.id, user.id.toString())}
          >
            {user?.spyMaster ? (
              <div className="w-2/3 h-24 bg-neutral-100 flex justify-center items-center">
                {c.death ? (
                  <p className="text-black">{c.word}</p>
                ) : c.color === false ? (
                  <p className="text-red-600">{c.word}</p>
                ) : (
                  <p className="text-blue-600">{c.word}</p>
                )}
              </div>
            ) : (
              <p className="text-black">{c.word}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
