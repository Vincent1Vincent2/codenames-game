import { db } from "@/src/utils/prismaClient";
import pusher from "@/src/utils/pusherServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db.user.deleteMany({
      where: {
        isAdmin: false,
      },
    });

    // Notify clients about the user list update
    const remainingUsers = await db.user.findMany({});
    await pusher.trigger("codename-game", "users-cleared", remainingUsers);

    return new NextResponse(JSON.stringify({ users: remainingUsers }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST /api/clearUsers:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
