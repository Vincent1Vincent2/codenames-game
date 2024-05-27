"use server";
import { db } from "@/src/utils/prismaClient";

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

  return points;
}
