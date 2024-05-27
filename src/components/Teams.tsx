import { User } from "@prisma/client";
import { setSpymaster } from "../app/actions/userActions";

interface Points {
  bluePoints: number | 0;
  redPoints: number | 0;
}

interface PageProps {
  users: User[];
  points: Points | undefined;
}

export function Teams({ users, points }: PageProps) {
  async function becomeSpymaster(userId: string | undefined, users: User[]) {
    if (!userId) {
      console.error("No user id");
    } else {
      await setSpymaster(userId, users);
    }
  }

  const isSpymasterOnTeam = (team: boolean) => {
    return users.some((u) => u.spyMaster === true && u.team === team);
  };

  return (
    <div>
      <div>
        <span>Points - {points?.redPoints}</span>
        <div>
          {users.map((u) =>
            u.team === false && u.spyMaster === false ? (
              <p className="text-red-600" key={u.id}>
                {u.name}
              </p>
            ) : null
          )}
          {!isSpymasterOnTeam(false) && (
            <button
              onClick={() =>
                becomeSpymaster(
                  users.find((u) => u.team === false && u.spyMaster === false)
                    ?.id,
                  users
                )
              }
            >
              Become Spymaster
            </button>
          )}
        </div>
        <p>Spymaster</p>
        {users.map((u) =>
          u.team === false && u.spyMaster === true ? (
            <p className="text-red-600" key={u.id}>
              {u.name}
            </p>
          ) : null
        )}
      </div>
      <div>
        <span>Points - {points?.bluePoints}</span>
        <div>
          {users.map((u) =>
            u.team === true && u.spyMaster === false ? (
              <p className="text-blue-600" key={u.id}>
                {u.name}
              </p>
            ) : null
          )}
          {!isSpymasterOnTeam(true) && (
            <button
              onClick={() =>
                becomeSpymaster(
                  users.find((u) => u.team === true && u.spyMaster === false)
                    ?.id,
                  users
                )
              }
            >
              Become Spymaster
            </button>
          )}
        </div>
        <p>Spymaster</p>
        {users.map((u) =>
          u.team === true && u.spyMaster === true ? (
            <p className="text-blue-600" key={u.id}>
              {u.name}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
}
