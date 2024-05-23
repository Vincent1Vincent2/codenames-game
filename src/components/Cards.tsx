import { Substantiv } from "../../server/data";
import { User } from "../../server/interfaces";

interface Props {
  cards: Substantiv[];
  users: User[];
  username: string;
  handleCardClick: (ord: string) => void;
}
export default function Card({
  cards,
  users,
  handleCardClick,
  username,
}: Props) {
  return (
    <>
      {users.map((user) => {
        return user.spyMaster ? (
          <div
            className="grid grid-row-5 grid-cols-5 gap-2 place-items-center "
            key={user.id}
          >
            {cards.map((c, index) => (
              <button
                key={index}
                className="shadow-md p-10 font-bold bg-blue-200 w-full transition-all hover:bg-blue-100 rounded cursor-pointer focus:ring-4 focus:ring-black"
                onClick={() => handleCardClick(c.ord)}
              >
                <p
                  className={
                    c.death
                      ? "text-gray-400"
                      : c.color
                      ? "text-red-400"
                      : "text-blue-400"
                  }
                >
                  {c.ord}
                </p>
                {c.death && <p className="text-black-500">Death Card</p>}
              </button>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-row-5 grid-cols-5 gap-2 place-items-center"
            key={user.id}
          >
            {cards.map((c, index) => (
              <button
                key={index}
                className="shadow-md p-10 font-bold bg-blue-200 w-full transition-all hover:bg-blue-100 rounded cursor-pointer focus:ring-4 focus:ring-black"
                onClick={() => handleCardClick(c.ord)}
              >
                <p className="text-black">{c.ord}</p>
              </button>
            ))}
          </div>
        );
      })}
    </>
  );
}
