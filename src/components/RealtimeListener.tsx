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
}

const RealtimeListener = ({
  onUsersUpdated,
  onCardsCreate,
  handlePointsUpdated,
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

    return () => {
      channel.unbind("user-updated", handleUserUpdate);
      channel.unbind("card-updated", handleCardUpdate);
      channel.unbind("points-updated");
      channel.unbind("user-updated");
      channel.unsubscribe();
    };
  }, [handlePointsUpdated, onUsersUpdated, onCardsCreate]);

  return null;
};

export default RealtimeListener;
