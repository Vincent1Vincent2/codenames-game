import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Substantiv } from "../../server/data";
import { User } from "../../server/interfaces";
import Card from "./Cards";
import SpyInput from "./spyInput";

interface Props {
  users: User[];
  username: string;
  cards: Substantiv[];
  handleCardClick: (ord: string) => void;
}

export default function Dashboard({
  cards,
  users,
  handleCardClick,
  username,
}: Props) {
  const [redTeamPoints, setRedTeamPoints] = useState(0);
  const [blueTeamPoints, setBlueTeamPoints] = useState(0);

  useEffect(() => {
    const socket = io();

    socket.on("points", ({ redTeamPoints, blueTeamPoints }) => {
      setRedTeamPoints(redTeamPoints);
      setBlueTeamPoints(blueTeamPoints);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="h-[90vh] w-screen bg-gradient-to-r from-blue-400 to-red-400">
        <div className="flex justify-between">
          <section className="sectionLeft">
            <div className="sidebarLeft w-full h-screen p-10">
              <div className="sidebarLeftContent  p-20 flex flex-col gap-4 rounded-lg bg-blue-300 shadow-xl">
                <div>
                  <h1 className="text-lg font-bold	">BLUE TEAM</h1>
                  {users.map((user) =>
                    user.team === false && user.spyMaster === false ? (
                      <p key={user.id}>{user.name}</p>
                    ) : null
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-bold">SPYMASTA</h1>
                  {users.map((user) =>
                    user.spyMaster === true && user.team === false ? (
                      <p key={user.id}>{user.name}</p>
                    ) : null
                  )}
                </div>
                <p>{blueTeamPoints} Points</p>
              </div>
              {users.map((user) =>
                user.spyMaster === true && user.team === false ? (
                  <SpyInput key={user.id} />
                ) : null
              )}
            </div>
          </section>
          <main className="flex justify-center py-5 ">
            <Card
              cards={cards}
              users={users}
              username={username}
              handleCardClick={handleCardClick}
            />
          </main>
          <section className="sectionRight">
            <div className="sidebarRight w-full h-screen p-10 ">
              <div className="sidebarRightContent  ">
                <div className="sidebarRightContent p-20 flex flex-col gap-4 rounded-lg bg-red-400 shadow-xl">
                  <div>
                    <div>
                      <h1 className="text-lg font-bold	">RED TEAM</h1>
                      {users.map((user) =>
                        user.team === true && user.spyMaster === false ? (
                          <p key={user.id}>{user.name}</p>
                        ) : null
                      )}
                    </div>
                    <div>
                      <h1 className="text-lg font-bold">SPYMASTA</h1>
                      {users.map((user) =>
                        user.spyMaster === true && user.team === true ? (
                          <>
                            <p key={user.id}>{user.name}</p>
                          </>
                        ) : null
                      )}
                    </div>
                  </div>
                  <div>
                    <p>{redTeamPoints} Points</p>
                  </div>
                </div>
              </div>
              {users.map((user) =>
                user.spyMaster === true && user.team === true ? (
                  <SpyInput key={user.id} />
                ) : null
              )}
            </div>
          </section>
          <div className="absolute bottom-0 text-white p-20 text-2xl font-extrabold		">
            BETA 0.1
          </div>
        </div>
      </div>
    </>
  );
}
