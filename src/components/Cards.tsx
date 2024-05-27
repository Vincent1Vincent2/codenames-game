"use client";
import { Card } from "@prisma/client";
import { UserData } from "next-auth/providers/42-school";
import { useEffect, useState } from "react";
import { handleCardClick } from "../app/actions/cardActions";
import { getPoints } from "../app/actions/pointActions";

interface PageProps {
  cards: Card[];
}

interface Points {
  bluePoints: number | 0;
  redPoints: number | 0;
}

export default function Cards({ cards }: PageProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [points, setPoints] = useState<Points>();

  useEffect(() => {
    const localUserData = localStorage.getItem("userData");
    if (localUserData) {
      const parsedUserData: UserData = JSON.parse(localUserData);
      setUserData(parsedUserData);
    }
  }, []);

  async function cardClick(cardId: string, userId: string) {
    await handleCardClick(cardId, userId);
    const points = await getPoints();
    setPoints(points);
  }

  return (
    <div>
      {points?.bluePoints}
      {points?.redPoints}
      <div className="grid grid-cols-5 grid-rows-5 place-items-center gap-5">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => userData && cardClick(c.id, userData.id.toString())}
          >
            <div className="w-2/3 h-32 bg-neutral-100 flex justify-center items-center">
              {c.death ? (
                <p className="text-gray-600">{c.word}</p>
              ) : c.color ? (
                <p className="text-blue-600">{c.word}</p>
              ) : (
                <p className="text-red-600">{c.word}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
