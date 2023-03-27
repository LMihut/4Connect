import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { io, Socket } from "socket.io-client";
import {
  GameState,
  GameStateEnum,
  GameStep,
  Player,
  PlayerStateEnum,
} from "../pages/GamePage/components/GameEngine";
import { GameRoom } from "../pages/NewgamePage/components/GameRoomList";
import { authContext } from "./AuthenticationContext";
import { reRenderBoard } from "../pages/GamePage/components/GameBoard";
import { game } from "../pages/GamePage/GamePage";

const socket = io();

interface SocketContextInterface {
  socket: Socket;
  joinedRoom: GameRoom | null;
  rooms: GameRoom[];
  gameState: GameState | null;
  setJoinedRoom: (g: GameRoom) => void;
  setGameStateFromGameBoard: (gs: GameState) => void;
  messages: { name: string; message: string }[];
  resetMessages: () => void;
}

export const SocketContext = React.createContext<SocketContextInterface>({
  socket,
  joinedRoom: null,
  rooms: [],
  gameState: {
    connect: 4,
    winner: "undefined",
    active_player: "undefined",
    active_player_state: PlayerStateEnum.ACTIVE,
    active_start: new Date().getTime(),
    players: new Map<string, Player>(),
    state: GameStateEnum.NOT_STARTED,
    steps: new Array<GameStep>(),
    date: new Date(),
  },
  setJoinedRoom: (g: GameRoom) => {},
  setGameStateFromGameBoard: (gs: GameState) => {},
  messages: [],
  resetMessages: () => {},
});

export const SocketProvider: React.FC = ({ children }) => {
  const [joinedRoom, setJoinRoom] = useState<GameRoom | null>(null);
  const [rooms, setRooms] = useState<GameRoom[]>([]);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [messages, setMessages] = useState<{ name: string; message: string }[]>(
    []
  );

  const { token } = useContext(authContext);
  const tokenName =
    token != null ? JSON.parse(atob(token!.split(".")[1])).name : "";

  console.log("rooms ", rooms);
  console.log("joinRoom ", joinedRoom);
  console.log("gameState ", gameState);

  useEffect(() => {
    socket.on("joinNewPage", (message: any) => {
      const g: GameRoom[] = message.settings;

      g.length !== 0 && setRooms(g);

      g.forEach((item: GameRoom) => {
        if (item.name === tokenName) {
          setJoinRoom(item);
        }
      });

      setGameState(null);
    });

    socket.on("createroom", (message: any) => {
      if (Object.keys(message).length !== 0) {
        //const r: GameRoom = message.settings;
        //setJoinRoom(r);
      }
    });

    socket.on("joinedRoom", (message: any) => {
      if (Object.keys(message).length !== 0) {
        const r: GameRoom = message.settings;

        setJoinRoom(r);
      }

      //
    });
    socket.on("player2join", (message: any) => {
      console.log("some one joined", message);
      if (Object.keys(message).length !== 0) {
        const r: GameRoom = message.settings;

        setJoinRoom(r);
      }
    });

    socket.on("refreshRoom", (message: any) => {
      const g: GameRoom[] = message.settings;
      setRooms(g);
    });

    socket.on("refreshGameState", (message: any) => {
      const newGameState: GameState = message.gameState.gameState;
      const playerValuesAsArray: any[] = message.gameState.playerValuesAsArray;
      const playerIdsAsArray: any[] = message.gameState.playerIdsAsArray;
      newGameState.players = new Map<string, Player>();

      for (let i = 0; i < playerValuesAsArray.length; i++) {
        newGameState.players.set(playerIdsAsArray[i], playerValuesAsArray[i]);
      }
      if (game) game.setGame(newGameState);

      setGameState(newGameState);
      reRenderBoard(true, false);
      console.log("refresh state ", newGameState);
      if (newGameState.state === 3) {
        //        setGameState(null);
      }
    });

    socket.on("message", ({ name, message }) => {
      console.log("message: ", message);
      setMessages((messages) => [...messages, { name, message }]);
    });

    socket.on("deleteroom", (message: any) => {
      console.log("delete received ", message);

      setRooms(message.settings);
      setJoinRoom(null);
    });
  }, [tokenName]);

  const setJoinedRoom = (g: GameRoom) => {
    setJoinRoom(g);
  };

  const setGameStateFromGameBoard = (gs: GameState) => {
    setGameState(gs);
  };

  const resetMessages = () => {
    setMessages([]);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        joinedRoom,
        rooms,
        gameState,
        setJoinedRoom,
        setGameStateFromGameBoard,
        messages,
        resetMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
