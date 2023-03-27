import { StyledField } from "./Field";
import React, { useContext } from "react";
import { GameStateEnum, GameStep } from "./GameEngine";
import styled from "styled-components";
import { FieldColumn } from "./Column";
import { theme } from "../../../theme";
import { SocketContext } from "../../../context/socket.context";
import { authContext } from "../../../context/AuthenticationContext";
import { game } from "../GamePage";

export const GameBoardWrapper = styled.div`
  overflowy: scroll;
  margin-right: 2%;
`;

export const GameBoard = () => {
  let columnId = -1;

  const socketContext = useContext(SocketContext);
  const { token } = useContext(authContext);
  const name = JSON.parse(atob(token!.split(".")[1])).name;

  const columnClicked = async (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("columnClicked gamestate", game.getGameState);

    if (
      game.activePlayer === name &&
      game.gameState === GameStateEnum.IN_PROGRESS
    ) {
      let column_number = parseInt(e.currentTarget.id.split("_")[1]);
      let step: GameStep | undefined = game.insert(column_number, name);
      if (step) {
        if (game.getCurrentStep() !== game.getTotalStep()) {
          colorField(
            step.x,
            step.y,
            theme.colors.gameBoardColumnColor,
            step.color
          );
        } else {
          colorField(step.x, step.y, step.color, step.color);
        }
        checkGameState();
        let gameStateWrapper = {
          gameState: game.getGameState,
          playerValuesAsArray: game.players,
          playerIdsAsArray: game.playerIds,
        };
        socketContext.socket.emit("refreshGameState", gameStateWrapper);
        socketContext.setGameStateFromGameBoard(game.getGameState);
      }
    } else {
      alert("its not your turn or the game has ended");
    }
    if (game.gameState === GameStateEnum.HAS_WINNER) {
      socketContext.socket.emit("message", {
        name: "System",
        message: game.winner + " win!",
      });
    }
  };

  return (
    <div
      id="game_board"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {game &&
        game.gameBoard.map((column, index) => {
          let rowId = -1;
          return (
            <FieldColumn
              id={"column_" + ++columnId}
              key={index}
              onClick={columnClicked}
            >
              {" "}
              {column.map((element, index) => {
                return (
                  <StyledField
                    id={"column_" + columnId + ".row_" + ++rowId}
                    key={index}
                    style={{
                      padding: `min(calc(700px/(2*${game.boardWidth})), calc(500px/(2*${game.boardHeight})))`,
                    }}
                  />
                );
              })}
            </FieldColumn>
          );
        })}
    </div>
  );
};

export const toFirstStep = function () {
  game.gotoFirstStep();
  reRenderBoard(true, false);
};

export const toLastStep = function () {
  game.resetCurrentStep();
  reRenderBoard();
};

export const reRenderBoard = function (
  simple: boolean = true,
  toTotalStep: boolean = true
) {
  let game_steps = game.gameSteps;

  if (simple) {
    for (let i: number = 1; i < game_steps.length; i++) {
      if (!toTotalStep && i > game.getCurrentStep()) {
        colorField(
          game_steps[i].x,
          game_steps[i].y,
          theme.colors.gameBoardColumnColor,
          game_steps[i].color
        );
      } else {
        colorField(
          game_steps[i].x,
          game_steps[i].y,
          game_steps[i].color,
          game_steps[i].color
        );
      }
    }
  } else {
    let game_board = game.gameBoard;

    for (let x: number = 0; x < game_board.length; x++) {
      for (let y: number = 0; y < game_board[x].length; y++) {
        colorField(
          x,
          y,
          game_steps[game_board[x][y]].color,
          game_board[x][y] === 0
            ? theme.colors.fontColor
            : game_steps[game_board[x][y]].color
        );
      }
    }
  }
};

export const reverseButtonClicked = async (
  e: React.MouseEvent<HTMLDivElement>
) => {
  let last_to_draw = game.reverseStep();
  if (last_to_draw === undefined) {
    return;
  }
  let step = game.gameSteps[last_to_draw + 1];
  colorField(step.x, step.y, theme.colors.gameBoardColumnColor);
};

export const advanceButtonClicked = async (
  e: React.MouseEvent<HTMLDivElement>
) => {
  let last_to_draw = game.advanceStep();
  if (last_to_draw === undefined) {
    return;
  }
  let step = game.gameSteps[last_to_draw];
  colorField(step.x, step.y, step.color);
};

export const resign = async (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("loser: " + game.activePlayer);
  game.resignPlayer(
    //TODO: Spieler ID angeben
    game.activePlayer
  );
  checkGameState();
};

const colorField = function (
  x: number,
  y: number,
  bg_color: string,
  border_color?: string
) {
  document.getElementById(
    "column_" + x + ".row_" + (game.boardHeight - 1 - y)
  )!.style.backgroundColor = bg_color;
  if (border_color !== undefined) {
    document.getElementById(
      "column_" + x + ".row_" + (game.boardHeight - 1 - y)
    )!.style.borderColor = border_color;
  }
};

const checkGameState = function () {
  //TODO: Implement response
  if (game.gameState !== GameStateEnum.IN_PROGRESS) {
    console.log("gamestate " + game.gameState);
    if (game.gameState === GameStateEnum.HAS_WINNER) {
      console.log("winner id" + game.winner);
      console.log("gamestate", game.getGameState);
    }
  }
};
