import { Card } from "@prisma/client";
import Pusher from "pusher-js";
import { useEffect } from "react";

interface UserData {
  id: string;
  name: string;
  team: boolean;
  spyMaster: boolean;
  isActive: boolean;
  isAdmin: boolean;
}

interface Points {
  bluePoints: number | 0;
  redPoints: number | 0;
}

interface Props {
  onUsersUpdated: (users: UserData[]) => void;
  onCardsCreate: (cards: Card[]) => void;
  handlePointsUpdated: (points: Points) => void;
  setSpymaster: (userId: string, users: UserData[]) => void;
}

const RealtimeListener = ({
  onUsersUpdated,
  onCardsCreate,
  handlePointsUpdated,
  setSpymaster,
}: Props) => {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });

    const channel = pusher.subscribe("codename-game");

    const handleUserUpdate = (newUsers: UserData[]) => {
      try {
        onUsersUpdated(newUsers);
      } catch (error) {
        console.error("Error handling user update:", error);
      }
    };

    const handleCardUpdate = (newCards: Card[]) => {
      try {
        onCardsCreate(newCards);
      } catch (error) {
        console.error("Error handling card update:", error);
      }
    };

    channel.bind("user-updated", handleUserUpdate);
    channel.bind("card-updated", handleCardUpdate);
    channel.bind("points-updated", (updatedPoints: Points) => {
      handlePointsUpdated(updatedPoints);
    });
    channel.bind(
      "user-updated",
      (data: { userId: string; users: UserData[] }) => {
        setSpymaster(data.userId, data.users);
      }
    );

    return () => {
      channel.unbind("user-updated", handleUserUpdate);
      channel.unbind("card-updated", handleCardUpdate);
      channel.unbind("points-updated");
      channel.unbind("user-updated");
      channel.unsubscribe();
    };
  }, [handlePointsUpdated, onUsersUpdated, onCardsCreate, setSpymaster]);

  return null;
};

export default RealtimeListener;
