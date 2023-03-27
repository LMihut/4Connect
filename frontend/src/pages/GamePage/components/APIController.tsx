import { GameRoom } from "../../NewgamePage/components/GameRoomList";
import { GameSettings } from "../../NewgamePage/components/GameSettings";
import { GameState } from "./GameEngine";

interface requestBody {
  players: string[];
  settings: GameSettings;
  winner: string;
}

export const PersistGame = async (gameRoom: GameRoom, gameState: GameState) => {
  const req: requestBody = {
    players: [gameRoom.player1.id, gameRoom.player2.id],
    settings: gameRoom.gameSetting,
    winner:
      gameState.winner === gameRoom.player1.name
        ? gameRoom.player1.id
        : gameRoom.player2.id,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  };
  const path = "/api/game/";

  await fetch(path, requestOptions);
};
