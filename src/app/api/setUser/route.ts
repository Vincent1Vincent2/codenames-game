import pusher from "@/src/utils/pusherServer";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  message: string;
};

export async function POST(req: NextRequest, res: NextResponse<Data>) {
  const body = await req.json();

  const { name, team, spyMaster, userId } = body;

  try {
    await pusher.trigger("codename-game", "user-updated", {
      id: userId,
      name,
      team,
      spyMaster,
    });
    return NextResponse.json("User created", { status: 200 });
  } catch (error) {
    console.error("Pusher Error", error);
    return NextResponse.json({ message: "Error triggering Pusher event" });
  }
}
