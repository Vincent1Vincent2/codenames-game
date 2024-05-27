import { Card, User } from "@prisma/client";
import Cards from "./Cards";
import { Teams } from "./Teams";

interface Points {
  bluePoints: number | 0;
  redPoints: number | 0;
}
interface PageProps {
  cards: Card[];
  users: User[];
  points: Points | undefined;
}

export function Dashboard({ cards, users, points }: PageProps) {
  return (
    <main>
      <Teams users={users} points={points} />
      <Cards cards={cards} />;
    </main>
  );
}
