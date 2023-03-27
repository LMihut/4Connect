import styled from "styled-components";
import React from "react";
import { GameRoom } from "./GameRoomList";
import { ComponentHeadline } from "../NewgamePage";

const GameDetailsLayout = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
  width: 30%;
  height: 40%;
`;

const GameTitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid white;
`;

const GameDetailsWrapper = styled.div`
  direction: flex;
  flex-direction: column;
`;

const GameText = styled.p`
  display: inline-block;
  width: 50%;
  text-align: start;
`;
const GameTextValue = styled.p`
  display: inline-block;
  width: 50%;
  text-align: end;
`;

export const GameDetails: React.FC<{ gameDetails: GameRoom | null }> = ({
  gameDetails,
}) => {
  return (
    <GameDetailsLayout>
      <ComponentHeadline> Game Room Details </ComponentHeadline>
      {gameDetails && (
        <div>
          <GameTitle>{gameDetails?.name}</GameTitle>
          <GameDetailsWrapper>
            <GameText>Player 1</GameText>
            <GameTextValue>{gameDetails.player1.name}</GameTextValue>
          </GameDetailsWrapper>
          <GameDetailsWrapper>
            <GameText>Player 2</GameText>
            <GameTextValue>{gameDetails.player2.name}</GameTextValue>
          </GameDetailsWrapper>
          <GameDetailsWrapper>
            <GameText>Board Width</GameText>
            <GameTextValue>{gameDetails.gameSetting.boardWidth}</GameTextValue>
          </GameDetailsWrapper>
          <GameDetailsWrapper>
            <GameText>Board Heigth</GameText>
            <GameTextValue>{gameDetails.gameSetting.boardHeigth}</GameTextValue>
          </GameDetailsWrapper>
          <GameDetailsWrapper>
            <GameText>Row Counts To Win</GameText>
            <GameTextValue>
              {gameDetails.gameSetting.rowCountToWin}
            </GameTextValue>
          </GameDetailsWrapper>
        </div>
      )}
    </GameDetailsLayout>
  );
};

export const GameDetailsEmpty: React.FC<{}> = () => {
  return (
    <GameDetailsLayout>
      <ComponentHeadline> Game Room Details </ComponentHeadline>
    </GameDetailsLayout>
  );
};
