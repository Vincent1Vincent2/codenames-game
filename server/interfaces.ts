export type User = SocketData;

export interface ServerToClientEvents {
  message: (message: string) => void;
  user: (user: User[]) => void;
  points: (points: { redTeamPoints: number; blueTeamPoints: number }) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
  sendClue: (clue: { word: string; amount: number }) => void;
  setUser: (name: string) => void;
  setSpymaster: (users: User[]) => void;
  selectWord: (selectedWord: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  id: string;
  name: string;
  team: boolean;
  spyMaster: boolean;
}
