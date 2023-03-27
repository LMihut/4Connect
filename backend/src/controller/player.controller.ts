import {Request, response, Response} from 'express';
import fetch from 'node-fetch'
import {getRepository} from 'typeorm';
import {Player} from '../entity/player.model';
import {Game} from '../entity/game.model';
import {Authentication} from '../middleware/authentication';

export const registerPlayer = async (req: Request, res: Response) => {
    const {email, name, password} = req.body;

    const userRepository = await getRepository(Player);

    // Check if user exists
    const user = await userRepository.findOne({
        where: {
            email,
        },
    });

    if (user) {
        return res.status(400).send({
            status: 'bad_request',
        });
    }

    // Generate hashed password
    const hashedPassword: string = await Authentication.hashPassword(password);

    const newUser = new Player();
    newUser.email = email;
    newUser.name = name;
    newUser.password = hashedPassword;

    const createdUser = await userRepository.save(newUser);
    delete createdUser.password;

    return res.send({
        data: createdUser,
    });
};

export const loginPlayer = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const userRepository = await getRepository(Player);
    // Check if user exists
    const user = await userRepository.findOne({
        where: {
            email,
        },
    });

    if (!user) {
        return res.status(401).send({status: 'unauthorized'});
    }

    const matchingPasswords: boolean = await Authentication.comparePasswordWithHash(password, user.password || '');
    if (!matchingPasswords) {
        return res.status(401).send({status: 'unauthorized'});
    }

    const token: string = await Authentication.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        eloScore: user.eloScore
    });

    return res.send({
        data: token,
    });

}


  // sorting players by elo
 export const sorted = async (req: Request, res: Response) =>{
  const playerRepository = await getRepository(Player);
  const players =  await playerRepository.find();
  const sortedplayers= players.sort(function (a,b){
    return b.eloScore - a.eloScore;
  });
  try {
    res.send({
      data: sortedplayers,
    });
  } catch (error) {
    res.status(404).send({status: 'Could not sort Players'});
  }

} 


//// CRUD Functions 
// Get all Players
export const getAllPlayers = async (req: Request, res: Response) => {
    const playerRepository = await getRepository(Player);
    const players = await playerRepository.find();
    try {
        res.send({
            data: players
        });
    } catch (error) {
        res.status(404).send({status: 'Could not Create Player'});
    }
}

// Get one Player
export const getPlayer = async (req: Request, res: Response) => {
    const playerid = req.params.playerId;
    const playerRepository = await getRepository(Player);
    const player = await playerRepository.findOneOrFail(playerid);
    try {
        res.send({data: player});
    } catch (error) {
        res.status(404).send({status: 'Player not found'});
    }
};

// Update Player
export const updatePlayer = async (req: Request, res: Response) => {
    const playerid = req.params.playerId;
    const {name, password, email, eloScore, preferredTheme} = req.body;
    const playerRepository = await getRepository(Player);
    try {
        let player = await playerRepository.findOneOrFail(playerid);
        player.name = name;
        player.password = password;
        player.email = email;
        player.eloScore = eloScore;
        player.preferredTheme = preferredTheme;
        player = await playerRepository.save(player);
        res.send({
            data: player
        });
    } catch (error) {
        res.status(404).send({
            status: 'Player not found'
        });
    }
};


// Create Player
export const createPlayer = async (req: Request, res: Response) => {
  const {name, password , email, eloScore, preferredTheme} = req.body;
  const player = new Player();
  player.name = name;
  player.password = password;
  player.email = email;
  /* player.preferredTheme = preferredTheme; */
  const playerRepository = await getRepository(Player);
  const createdPlayer = await playerRepository.save(player);
  try {
    res.send({
      data: createdPlayer,
    });
  } catch (error) {
    res.status(404).send({status: 'Could not Create Player'})
  }
};

// Delete Player
export const deletePlayer = async (req: Request, res: Response) => {
    const playerid = req.params.playerId;
    const playerRepository = await getRepository(Player);
    try {
        const player = await playerRepository.findOneOrFail(playerid);
        await playerRepository.remove(player);
        res.send({});
    } catch (error) {
        res.status(404).send({
            status: 'Player not found'
        });
    }
};

