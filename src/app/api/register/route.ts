import { NextRequest, NextResponse } from "next/server";

import pusher from "@/src/utils/pusherServer";

import { db } from "../../../utils/prismaClient";

interface UserRegistration {
  name: string;
}

// Define the structure of the response data
interface UserData {
  id: string;
  name: string;
  team: boolean;
  spyMaster: boolean;
}

// File: pages/api/register.ts

// This could be a database or any other data source in a real app
let users: UserData[] = [];

export async function POST(req: NextRequest) {
  try {
    const body: UserRegistration = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse(JSON.stringify({ message: "Name is required" }), {
        status: 400,
      });
    }

    const newUser = await db.user.create({
      data: {
        name,
        team: (await db.user.count()) % 2 === 0, // Alternate team assignment
        spyMaster: false,
      },
    });

    // Triggering a Pusher event to notify all clients about the new user
    await pusher.trigger("codename-game", "user-updated", [newUser]);

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/register:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
