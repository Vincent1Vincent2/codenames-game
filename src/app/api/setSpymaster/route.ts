import { db } from "@/src/utils/prismaClient";
import pusher from "@/src/utils/pusherServer";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  message: string;
};

export async function POST(req: NextRequest, res: NextResponse<Data>) {
  const body = await req.json();

  const { userId } = body;

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error(`Error: No user found`);
  }

  await db.user.update({ where: { id: user.id }, data: { spyMaster: true } });
  console.log(user);

  try {
    await pusher.trigger("codename-game", "user-updated", [user]);
    return NextResponse.json("User Updated", { status: 200 });
  } catch (error) {
    console.error("Pusher Error", error);
    return NextResponse.json({ message: "Error triggering Pusher event" });
  }
}
