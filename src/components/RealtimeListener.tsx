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

interface Props {
  onUsersUpdated: (users: UserData[]) => void;
  onCardsCreate: (cards: Card[]) => void;
}

const RealtimeListener = ({ onUsersUpdated, onCardsCreate }: Props) => {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });

    const channel = pusher.subscribe("codename-game");
    channel.bind("user-updated", (newUsers: UserData[]) => {
      onUsersUpdated(newUsers);
    });

    channel.bind("card-updated", (newCards: Card[]) => {
      onCardsCreate(newCards);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [onUsersUpdated]);

  return null;
};

export default RealtimeListener;
