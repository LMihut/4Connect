import { ServerOptions, Socket, Server } from "socket.io";

interface Player {
  name: String;
}
type GameSettings = {
  boardWidth: string;
  boardHeigth: string;
  rowCountToWin: string;
  time: string;
  gameMode: string;
  bestOf: string;
  rated: string;
};

interface Player {
  id: String;
  name: String;
  eloScore: number;
  ready: boolean;
}

type GameRoom = {
  id: string;
  name: string;
  player1: Player;
  player2: Player;
  guests: string[];
  gameSetting: GameSettings;
};

const players: Record<string, string> = {};
const rooms: Record<string, GameRoom> = {};

export const socket = ({ io }: { io: Server }) => {
  console.log("sockets");

  io.on("connection", (socket: Socket) => {
    socket.on("connectplayer", (message: any) => {
      // player.name = message.name;
      console.log({ message });
      console.log("id: " + socket.id);
      players[message.name] = socket.id;
      console.log(players);

      let returnRooms: GameRoom[] = [];
      for (let key in rooms) {
        let room = rooms[key];
        returnRooms.push(room);
      }

      socket.emit("joinNewPage", {
        settings: returnRooms,
      });
    });

    socket.on("createroom", (message: any) => {
      const settings: GameRoom = message;
      console.log(message);
      if (!rooms[message.name]) {
        rooms[message.name] = settings;
        socket.join(message.name);

        let returnRooms: GameRoom[] = [];
        for (let key in rooms) {
          let room = rooms[key];
          returnRooms.push(room);
        }
        socket.broadcast.emit("refreshRoom", {
          settings: returnRooms,
        });
        //socket.emit("createroom", {
        //settings: rooms[message.name],
        //});
      }
      console.log("rooms after creation: ", rooms);
    });

    socket.on("deleteroom", (message: any) => {
      const settings: GameRoom = message;
      console.log(message);
      if (rooms[message.name]) {
        delete rooms[message.name];
        let tmp = Object.values(rooms);

        socket.broadcast.emit("deleteroom", {
          settings: tmp,
        });
        socket.emit("deleteroom", {
          settings: tmp,
        });
        socket.leave(message.name);
      }
      console.log("rooms after deletion: ", rooms);
    });

    socket.on("joinedRoom", (message: any) => {
      console.log("joinedroom", message);
      rooms[message.roomName].player2 = message.player;
      console.log("joinedroom after", rooms[message.roomName]);

      //socket.emit("joinedRoom", {
      //settings: rooms[message.roomName],
      //});
      socket.to(message.roomName).emit("player2join", {
        settings: rooms[message.roomName],
      });
      let returnRooms: GameRoom[] = [];
      for (let key in rooms) {
        let room = rooms[key];
        returnRooms.push(room);
      }

      socket.emit("joinedRoom", {
        settings: rooms[message.roomName],
      });
      socket.emit("refreshRoom", {
        settings: returnRooms,
      });
    });

    socket.on("joinPlayer", (message: any) => {
      console.log("join", message);
      socket.join(message.name);

      console.log("rooms", io.sockets.adapter.rooms);
    });

    socket.on("refreshGameState", (message: any) => {
      socket.broadcast.emit("refreshGameState", {
        gameState: message,
      });
      socket.emit("refreshGameState", {
        gameState: message,
      });
      console.log("refreshGameState", message);
    });

    socket.on("message", ({ name, message }) => {
      socket.broadcast.emit("message", { name, message });
      socket.emit("message", { name, message });
    });

    socket.once("disconnect", () => {
      console.log("disconnect " + socket.id);
    });
  });
};
