"use server";
import { db } from "@/src/utils/prismaClient";
import pusher from "@/src/utils/pusherServer";

export async function getPoints() {
  const bluePoints = await db.card.findMany({
    where: {
      color: true,
      active: true,
      chosen: true,
    },
  });
  const redPoints = await db.card.findMany({
    where: {
      color: false,
      active: true,
      chosen: true,
    },
  });

  const points = {
    bluePoints: bluePoints.length,
    redPoints: redPoints.length,
  };

  await pusher.trigger("codename-game", "points-updated", points);
  return points;
}
