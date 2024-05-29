"use client";

import { Card } from "@prisma/client";
import { useEffect, useState } from "react";
import { User } from "../../server/interfaces";
import { setSpymaster } from "../app/actions/userActions";
import Cards from "./Cards";

interface Points {
  bluePoints: number | 0;
  redPoints: number | 0;
}

interface PageProps {
  users: User[];
  points: Points | undefined;
  cards: Card[];
}

export function Teams({ users, points, cards }: PageProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const localUserData = localStorage.getItem("userData");
    if (localUserData) {
      const parsedUserData: User = JSON.parse(localUserData);
      setUser(parsedUserData);
    }
  }, []);

  async function becomeSpymaster(userId: string | undefined) {
    if (!userId) {
      console.error("No user id");
    } else {
      await setSpymaster(user?.id);
    }
  }

  const isSpymasterOnTeam = (team: boolean) => {
    return users.some((u) => u.spyMaster === true && u.team === team);
  };

  return (
    <div className="flex justify-around m-10 text-white h-full items-center">
      <div className="flex flex-col items-center gap-5  p-5 px-10 rounded-md h-96 redTeam">
        <span>Points - {points?.redPoints}</span>
        <div className="flex gap-5">
          <div>
            <p>Red Team</p>
            {users.map((u) =>
              u.team === false && u.spyMaster === false ? (
                <p key={u.id}>{u.name}</p>
              ) : null
            )}
            {!isSpymasterOnTeam(false) && (
              <button
                onClick={() =>
                  becomeSpymaster(
                    users.find((u) => u.team === false && u.spyMaster === false)
                      ?.id
                  )
                }
              >
                Become Spymaster
              </button>
            )}
          </div>
          <div>
            <p>Spymaster</p>
            {users.map((u) =>
              u.team === false && u.spyMaster === true ? (
                <p key={u.id}>{u.name}</p>
              ) : null
            )}
          </div>
        </div>
      </div>
      <Cards cards={cards} />
      <div className="flex flex-col items-center gap-5 bg-blue-600 p-5 px-10 rounded-md h-96 blueTeam">
        <span>Points - {points?.bluePoints}</span>
        <div className="flex gap-5">
          <div>
            <p>Blue Team</p>
            {users.map((u) =>
              u.team === true && u.spyMaster === false ? (
                <p key={u.id}>{u.name}</p>
              ) : null
            )}

            {!isSpymasterOnTeam(true) && (
              <button
                onClick={() =>
                  becomeSpymaster(
                    users.find((u) => u.team === true && u.spyMaster === false)
                      ?.id
                  )
                }
              >
                Become Spymaster
              </button>
            )}
          </div>

          <div className="flex flex-col">
            <p>Spymaster</p>
            {users.map((u) =>
              u.team === true && u.spyMaster === true ? (
                <p key={u.id}>{u.name}</p>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
