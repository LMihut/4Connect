import { Router } from "express";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
  getGamesOfPlayer,
  getSomeGames,
  getplayersfromgame,
  numLostGames,
  numWonGames,
} from "../controller/game.controller";

export const gameRouter = Router({ mergeParams: true });


gameRouter.get("/:id", getGame);
gameRouter.get("/gameplayedby/:playerid", getGamesOfPlayer);
gameRouter.get("/somegames", getSomeGames)
gameRouter.get("/players/:gameId", getplayersfromgame);
gameRouter.get("/gamesLost/:playerid", numLostGames);
gameRouter.get("/gamesWon/:playerid", numWonGames);
gameRouter.post("/", createGame);
gameRouter.delete("/:id", deleteGame);
gameRouter.get("/", getAllGames);
