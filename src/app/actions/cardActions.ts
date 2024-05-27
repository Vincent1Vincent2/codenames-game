"use server";

import { db } from "@/src/utils/prismaClient";

export async function generateCards() {
  // Check if there are any active cards
  const activeCards = await db.card.findMany({
    where: { active: true },
  });

  // If there are active cards, return them
  if (activeCards.length > 0) {
    return activeCards;
  }

  // Fetch all cards from the database
  const cards = await db.card.findMany({});

  // Shuffle and select 25 cards
  let selectedWords = [...cards];
  selectedWords = selectedWords.sort(() => 0.5 - Math.random()).slice(0, 25);

  // Assign the death card
  const deathCardIndex = Math.floor(Math.random() * 25);
  selectedWords[deathCardIndex].death = true;
  selectedWords[deathCardIndex].active = true;

  // Remove the death card from the pool of cards to assign colors
  let teamCards = selectedWords.filter((_, index) => index !== deathCardIndex);

  // Distribute 12 red cards
  for (let i = 0; i < 12; i++) {
    teamCards[i].color = true; // Red
    teamCards[i].active = true;
  }

  // Distribute 12 blue cards
  for (let i = 12; i < 24; i++) {
    teamCards[i].color = false; // Blue
    teamCards[i].active = true;
  }

  // Ensure all team cards are not death cards and reset chosen
  teamCards = teamCards.map((card) => {
    card.death = false;
    card.chosen = false;
    return card;
  });

  // Add the death card back to the list
  selectedWords = [...teamCards, selectedWords[deathCardIndex]];

  // Shuffle the selected cards again
  selectedWords = selectedWords.sort(() => 0.5 - Math.random());

  // Update the database with the modified cards
  const updatePromises = selectedWords.map((card) =>
    db.card.update({
      where: { id: card.id },
      data: {
        color: card.color,
        active: card.active,
        death: card.death,
        chosen: card.chosen,
      },
    })
  );

  // Await all update promises
  await Promise.all(updatePromises);

  // Return the modified set of cards
  return selectedWords;
}

export async function getGeneratedCards() {
  const cards = await db.card.findMany({
    where: {
      active: true,
    },
  });
  return cards;
}

export async function resetActiveCards() {
  await db.card.updateMany({
    where: { active: true },
    data: { active: false, chosen: false },
  });
}

export async function handleCardClick(cardId: string, userId: string | null) {
  if (userId === null) {
    return;
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  const card = await db.card.findUnique({ where: { id: cardId } });

  if (card?.color && user?.team === true) {
    await db.card.update({ where: { id: card.id }, data: { chosen: true } });
  } else if (card?.color && user?.team === false) {
    console.log(false);
    await db.card.update({ where: { id: card.id }, data: { chosen: true } });
  }
}
