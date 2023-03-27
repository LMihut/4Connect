import styled from "styled-components";
import { theme } from "../../theme";
import {
  ContentWrapper,
  footerHeight,
  headerHeight,
  Layout,
} from "../../components/Layout";
import React, { useContext, useState } from "react";
import {
  advanceButtonClicked,
  GameBoard,
  GameBoardWrapper,
  resign,
  reverseButtonClicked,
  toFirstStep,
  toLastStep,
} from "./components/GameBoard";

import {
  ArrowLeftButton,
  ArrowLeftDangerButton,
  ArrowRightButton,
  ArrowRightDangerButton,
  ReplayButtonWrapper,
  ReplayButtonWrapperSingle,
} from "./components/ReplayButtons";

import {
  GameHeaderWrapper,
  PlayerNameWrapperActive,
  PlayerNameWrapperInactive,
} from "./components/GameHeader";

import { GameRoom } from "../NewgamePage/components/GameRoomList";
import { GameDetails } from "./components/GameDetails";
import { Button, VerticalButtonWrapper } from "../../components/Button";
import { SocketContext } from "../../context/socket.context";

import { Game, GameStateEnum } from "./components/GameEngine";
import { Chat } from "./components/Chat";
import { GameoverPopup } from "./components/GameoverPopup";
import { authContext } from "../../context/AuthenticationContext";
import { PersistGame } from "./components/APIController";

const GameBody = styled.div`
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

const LeftGameBodyWrapper = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const RightGameBodyWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const gameRoom: GameRoom = {
  id: "1",
  name: "Test Room Name1",
  player1: { name: "test", eloScore: 123, id: "1", ready: false },
  player2: { name: "test12", eloScore: 123, id: "2", ready: false },
  guests: ["Gast1", "Gast2"],
  gameSetting: {
    boardWidth: "7",
    boardHeigth: "7",
    rowCountToWin: "4",
    time: "7",
  },
};

export var game: Game;

export const GamePage = () => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [stepCounterRerender, setStepCounterRerenderer] = useState(0);
  const [persistOnce, setPersistOnce] = useState(true);
  const { socket, rooms, gameState, joinedRoom } = useContext(SocketContext);
  const socketContext = useContext(SocketContext);
  const { token } = useContext(authContext);
  const name = JSON.parse(atob(token!.split(".")[1])).name;

  if (
    socketContext.joinedRoom &&
    socketContext.joinedRoom?.player1.name !== "" &&
    (!game || game.gameState === GameStateEnum.SUSPENDED)
  ) {
    console.log("CREATE NEW GAME");
    game = new Game(
      Number(socketContext.joinedRoom?.gameSetting.boardWidth),
      Number(socketContext.joinedRoom?.gameSetting.boardHeigth),
      Number(socketContext.joinedRoom?.gameSetting.rowCountToWin)
    );

    game.addPlayer(
      socketContext.joinedRoom?.player1.name,
      socketContext.joinedRoom?.player1.name,
      theme.colors.player1Color,
      Number(socketContext.joinedRoom?.gameSetting.time)
    );

    if (
      socketContext.joinedRoom &&
      socketContext.joinedRoom?.player2.name !== ""
    ) {
      game.addPlayer(
        socketContext.joinedRoom?.player2.name,
        socketContext.joinedRoom?.player2.name,
        theme.colors.player2Color,
        Number(socketContext.joinedRoom?.gameSetting.time)
      );
      game.startGame();
      game.cyclePlayer();
      let gameStateWrapper = {
        gameState: game.getGameState,
        playerValuesAsArray: game.players,
        playerIdsAsArray: game.playerIds,
      };
      socketContext.socket.emit("refreshGameState", gameStateWrapper);
      socketContext.socket.emit("message", {
        name: "System",
        message: "Player joined ... Game Started ... GL HF",
      });
      //      socketContext.setGameStateFromGameBoard(game.getGameState);
    } else {
      socketContext.socket.emit("message", {
        name: "System",
        message: "Waiting for opponent...",
      });
    }
  }
  if (game && game.getGameState) {
    if (
      game.getGameState.state === GameStateEnum.HAS_WINNER &&
      name === game.getGameState.winner &&
      persistOnce
    ) {
      console.log("@@@@@@@@ SPEICHER GAME IN DB @@@@@@@");
      setPersistOnce(false);
      PersistGame(socketContext.joinedRoom as GameRoom, game.getGameState);
    }
  }

  const rerenderStepCounter = function () {
    setStepCounterRerenderer(game.getCurrentStep());
  };
  return (
    <Layout>
      <ContentWrapper>
        {game && game.winner && <GameoverPopup />}
        <GameBody>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
            }}
          >
            <LeftGameBodyWrapper>
              <GameHeaderWrapper>
                {game && game.playerIds[0] === gameState?.active_player && (
                  <PlayerNameWrapperActive
                    style={{ backgroundColor: theme.colors.player1Color }}
                  >
                    {joinedRoom !== null ? joinedRoom.player1.name : ""}
                  </PlayerNameWrapperActive>
                )}
                {game && game.playerIds[0] !== gameState?.active_player && (
                  <PlayerNameWrapperInactive>
                    {joinedRoom !== null ? joinedRoom.player1.name : ""}
                  </PlayerNameWrapperInactive>
                )}
                <PlayerNameWrapperInactive>VS</PlayerNameWrapperInactive>
                {game && game.playerIds[1] === gameState?.active_player && (
                  <PlayerNameWrapperActive
                    style={{ backgroundColor: theme.colors.player2Color }}
                  >
                    {joinedRoom !== null ? joinedRoom.player2.name : ""}
                  </PlayerNameWrapperActive>
                )}
                {game && game.playerIds[1] !== gameState?.active_player && (
                  <PlayerNameWrapperInactive>
                    {joinedRoom !== null ? joinedRoom.player2.name : ""}
                  </PlayerNameWrapperInactive>
                )}
              </GameHeaderWrapper>
              <GameBoardWrapper onClick={rerenderStepCounter}>
                <GameBoard />
              </GameBoardWrapper>
              <ReplayButtonWrapper onClick={rerenderStepCounter}>
                <ReplayButtonWrapperSingle onClick={toFirstStep}>
                  <ArrowLeftDangerButton />
                </ReplayButtonWrapperSingle>
                <ReplayButtonWrapperSingle onClick={reverseButtonClicked}>
                  <ArrowLeftButton></ArrowLeftButton>
                </ReplayButtonWrapperSingle>
                <ReplayButtonWrapperSingle>
                  {game !== null ? game?.getCurrentStep() : "Not Started"}
                </ReplayButtonWrapperSingle>
                <ReplayButtonWrapperSingle onClick={advanceButtonClicked}>
                  <ArrowRightButton></ArrowRightButton>
                </ReplayButtonWrapperSingle>
                <ReplayButtonWrapperSingle onClick={toLastStep}>
                  <ArrowRightDangerButton />
                </ReplayButtonWrapperSingle>
              </ReplayButtonWrapper>
            </LeftGameBodyWrapper>
            <RightGameBodyWrapper>
              <GameDetails
                gameDetails={joinedRoom !== null ? joinedRoom : gameRoom}
              />
              <Chat />
              <VerticalButtonWrapper style={{ height: 75 }}>
                <Button style={{ width: 100 }} onClick={resign}>
                  Resign
                </Button>
              </VerticalButtonWrapper>
            </RightGameBodyWrapper>
          </div>
        </GameBody>
      </ContentWrapper>
    </Layout>
  );
};
