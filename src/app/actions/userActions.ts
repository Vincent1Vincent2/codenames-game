"use server";

import { db } from "@/src/utils/prismaClient";
import pusher from "@/src/utils/pusherServer";
import { User } from "next-auth";

interface UserData {
  id: string;
  name: string;
  team: boolean;
  spyMaster: boolean;
  isActive: boolean;
  isAdmin: boolean;
}

// Base URL for the fetch request
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Ensure this function is used to register and trigger the Pusher event
export async function registerUser(name: string): Promise<UserData | null> {
  if (!name) {
    console.error("Name is required");
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const newUser: UserData = await response.json();
      console.log("Registration successful:", newUser);

      await pusher.trigger("codename-game", "user-updated", [newUser]); // Make sure to send an array if needed

      return newUser;
    } else {
      const error = await response.json();
      console.error("Failed to register:", error.message);
      return null;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
}

export async function getUsers() {
  const users = await db.user.findMany({});
  return users;
}

export const clearUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/cleanUsers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await db.user.findMany({});
  } catch (error) {
    console.error("Failed to clear users:", error);
    return null;
  }
};

export async function setSpymaster(
  userId: string,
  users: User[]
): Promise<UserData | null> {
  if (!userId) {
    console.error("Name is required");
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/setSpymaster`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const newUser: UserData = await response.json();
      console.log("Update successful:", newUser);

      await pusher.trigger("codename-game", "user-updated", [newUser]); // Make sure to send an array if needed

      return newUser;
    } else {
      const error = await response.json();
      console.error("Failed to register:", error.message);
      return null;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
}
