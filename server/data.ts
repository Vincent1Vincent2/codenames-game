export interface Substantiv {
  ord: string;
  color: boolean;
  death?: boolean;
  valt: boolean;
}

export const substantivArray: Substantiv[] = [
  { ord: "Apelsin", color: true, valt: false },
  { ord: "Bil", color: false, valt: false },
  { ord: "Bord", color: true, valt: false },
  { ord: "Blomma", color: false, valt: false },
  { ord: "Bok", color: true, valt: false },
  { ord: "Cykel", color: false, valt: false },
  { ord: "Dator", color: true, valt: false },
  { ord: "Dörr", color: false, valt: false },
  { ord: "Fönster", color: true, valt: false },
  { ord: "Fågel", color: false, valt: false },
  { ord: "Glas", color: true, valt: false },
  { ord: "Gata", color: false, valt: false },
  { ord: "Hund", color: true, valt: false },
  { ord: "Häst", color: false, valt: false },
  { ord: "Hatt", color: true, valt: false },
  { ord: "Hjärta", color: false, valt: false },
  { ord: "Hus", color: true, valt: false },
  { ord: "Jordgubbe", color: false, valt: false },
  { ord: "Katt", color: true, valt: false },
  { ord: "Klocka", color: false, valt: false },
  { ord: "Kniv", color: true, valt: false },
  { ord: "Kudde", color: false, valt: false },
  { ord: "Lampa", color: true, valt: false },
  { ord: "Leksak", color: false, valt: false },
  { ord: "Mat", color: true, valt: false },
  { ord: "Mobil", color: false, valt: false },
  { ord: "Måne", color: true, valt: false },
  { ord: "Mugg", color: false, valt: false },
  { ord: "Mus", color: true, valt: false },
  { ord: "Nyckel", color: false, valt: false },
  { ord: "Penna", color: true, valt: false },
  { ord: "Pojke", color: false, valt: false },
  { ord: "Radio", color: true, valt: false },
  { ord: "Sked", color: false, valt: false },
  { ord: "Skola", color: true, valt: false },
  { ord: "Stol", color: false, valt: false },
  { ord: "Sol", color: true, valt: false },
  { ord: "Säng", color: false, valt: false },
  { ord: "Tåg", color: true, valt: false },
  { ord: "Tårta", color: false, valt: false },
  { ord: "Träd", color: true, valt: false },
  { ord: "Tv", color: false, valt: false },
  { ord: "Vatten", color: true, valt: false },
  { ord: "Väska", color: false, valt: false },
  { ord: "Äpple", color: true, valt: false },
  { ord: "Ägg", color: false, valt: false },
  { ord: "Ängel", color: true, valt: false },
  { ord: "År", color: false, valt: false },
  { ord: "Öga", color: true, valt: false },
  { ord: "Öra", color: false, valt: false },
  { ord: "Bokstav", color: true, valt: false },
  { ord: "Papper", color: false, valt: false },
  { ord: "Tavla", color: true, valt: false },
  { ord: "Tak", color: false, valt: false },
  { ord: "Golv", color: true, valt: false },
  { ord: "Trappa", color: false, valt: false },
  { ord: "Gardin", color: true, valt: false },
  { ord: "Kudde", color: false, valt: false },
  { ord: "Skrivbord", color: true, valt: false },
  { ord: "Filt", color: false, valt: false },
  { ord: "Kaffekopp", color: true, valt: false },
  { ord: "Tallrik", color: false, valt: false },
  { ord: "Skål", color: true, valt: false },
  { ord: "Gaffel", color: false, valt: false },
  { ord: "Smörgås", color: true, valt: false },
  { ord: "Soppa", color: false, valt: false },
  { ord: "Bokhylla", color: true, valt: false },
  { ord: "Tidning", color: false, valt: false },
  { ord: "Bokhandel", color: true, valt: false },
  { ord: "Fjärrkontroll", color: false, valt: false },
  { ord: "Kalender", color: true, valt: false },
  { ord: "Klocka", color: false, valt: false },
  { ord: "Diskmaskin", color: true, valt: false },
  { ord: "Tvättmaskin", color: false, valt: false },
  { ord: "Torktumlare", color: true, valt: false },
  { ord: "Soptunna", color: false, valt: false },
  { ord: "Dammsugare", color: true, valt: false },
  { ord: "Sängkläder", color: false, valt: false },
  { ord: "Handduk", color: true, valt: false },
  { ord: "Tandborste", color: false, valt: false },
  { ord: "Tandkräm", color: true, valt: false },
  { ord: "Hårborste", color: false, valt: false },
  { ord: "Schampo", color: true, valt: false },
  { ord: "Dusch", color: false, valt: false },
  { ord: "Badkar", color: true, valt: false },
  { ord: "Tvål", color: false, valt: false },
  { ord: "Spegel", color: true, valt: false },
  { ord: "Fönsterbräda", color: false, valt: false },
  { ord: "Blomkruka", color: true, valt: false },
  { ord: "Trädgård", color: false, valt: false },
  { ord: "Gräsmatta", color: true, valt: false },
  { ord: "Häck", color: false, valt: false },
  { ord: "Staket", color: true, valt: false },
  { ord: "Gungställning", color: false, valt: false },
  { ord: "Sandlåda", color: true, valt: false },
  { ord: "Garage", color: false, valt: false },
  { ord: "Bilnyckel", color: true, valt: false },
  { ord: "Parkeringsplats", color: false, valt: false },
  { ord: "Vattenflaska", color: true, valt: false },
  { ord: "Termos", color: false, valt: false },
];

export function generateCards(): Substantiv[] {
  let selectedWords = [...substantivArray];
  selectedWords = selectedWords.sort(() => 0.5 - Math.random()).slice(0, 25);

  // Fördela 12 röda kort
  for (let i = 0; i < 12; i++) {
    selectedWords[i].color = true; // Red
  }

  // Fördela 12 blå kort
  for (let i = 12; i < 24; i++) {
    selectedWords[i].color = false; // Blue
  }

  // Lägg till ett dödskort
  const deathCardIndex = Math.floor(Math.random() * 25);
  selectedWords[deathCardIndex].death = true;

  selectedWords = selectedWords.map((card, index) => {
    if (index !== deathCardIndex) {
      card.death = false;
    }
    card.valt = false;
    return card;
  });

  // Blanda korten igen
  selectedWords = selectedWords.sort(() => 0.5 - Math.random());

  return selectedWords;
}
