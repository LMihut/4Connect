import { Router } from "express";
import { playerRouter } from "./player.router";
import { gameRouter } from "./game.router";
import { moveRouter } from "./move.router";

export const globalRouter = Router({ mergeParams: true });

interface HelloWorldReponse {
  message: string;
}
globalRouter.get("/", (req, res) => {
  res.send({ message: "hello world global" } as HelloWorldReponse);
});

globalRouter.use("/user", playerRouter);

//player router
globalRouter.use("/player", playerRouter);
//game router
globalRouter.use("/game", gameRouter);
// move move
globalRouter.use("/move", moveRouter);
