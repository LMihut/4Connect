import { getRepository } from "typeorm";
import { Move } from "../entity/move.model";
import { RequestHandler, Request, Response } from "express";

//// CRUD Functions 

// Get all Moves
export const getAllMoves = async (req: Request, res: Response) => {
    const gameid = req.params.id;
    const moveRepository = await getRepository(Move);
    const sqlQuery = `select * from move where gameid = "${gameid}"`;
    const moves = await moveRepository.query(sqlQuery);
    try {
      res.send({ 
        data: moves
      });
    } catch (error) {
      res.status(404).send({status:'Could not find any moves'});
    }
  };
  
  // Get one Move
  export const getMove = async (req: Request ,res: Response) => {
    const moveid = req.params.id;
    const moveRepository = await getRepository(Move);
    const move = await moveRepository.findOneOrFail(moveid);
    try {
      res.send({data:move});
    } catch (error) {
      res.status(404).send({status: 'Game not found'});
    }
  };

  // Create a Move
export const createMove = async (req: Request, res: Response) => {
    const {createdAt} = req.body;
    const move = new Move();
    move.createdAt = createdAt;
  
    const moveRepository = await getRepository(Move);
    const createdMove = await moveRepository.save(move);
    try {
      res.send({
        data: createdMove,
      });
    } catch (error) {
      res.status(404).send({status: 'Could not create Move'});
    }

  };
  
