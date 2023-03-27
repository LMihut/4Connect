import {Router} from 'express';
import { 
    loginPlayer, 
    registerPlayer,
    createPlayer,
    deletePlayer,
    getAllPlayers,
    getPlayer,
    updatePlayer,
    sorted,
} from '../controller/player.controller';


//Login & Register

export const playerRouter = Router({mergeParams: true });

playerRouter.post('/', registerPlayer);
playerRouter.post('/token', loginPlayer);


//Game
playerRouter.get("/sortplayers",sorted)
playerRouter.put("/:playerId", updatePlayer);
playerRouter.get("/:playerId", getPlayer);
playerRouter.post("/", createPlayer);
playerRouter.delete("/:playerId", deletePlayer);
playerRouter.get("/", getAllPlayers);
