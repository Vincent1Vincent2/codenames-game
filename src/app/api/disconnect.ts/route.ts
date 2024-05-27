// pages/api/disconnect.ts
import { db } from "@/src/utils/prismaClient";
import pusher from "@/src/utils/pusherServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        {
          status: 400,
        }
      );
    }

    // Mark the user as inactive in the database
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    // Trigger a Pusher event to notify all clients about the user disconnection
    await pusher.trigger("codename-game", "user-disconnected", updatedUser);

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/disconnect:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
