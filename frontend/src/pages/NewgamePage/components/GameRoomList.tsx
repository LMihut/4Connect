import React from "react";
import styled from "styled-components";
import { Player } from "../../Dashboard/components/PlayerStats";
import { GameSettings } from "./GameSettings";

export type GameRoom = {
  id: string;
  name: string;
  player1: Player;
  player2: Player;
  guests: string[];
  gameSetting: GameSettings;
};

const GameRoomFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const GameRoomHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const GameRoomItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 2rem;
`;

export const GameRoomListLayout = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  width: 30%;
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
  height: 58%;
  position: relative;
`;

export const GameRoomList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  ${GameRoomItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
  height: 58%;
  overflow-y: auto;
`;

export const GameRoomTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
`;

export const GameRoomPlayers = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
`;

export const GameRoomGuests = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
`;

const GameRoomWrapper = styled.div`
  width: "100%";
  text-align: left;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  border-radius: 0.5rem;
  margin: 3%;
  border-radius: 10px;
  &:hover {
    background-color: #0080007a;
  }
`;

export type GameRoomItemProps = {
  gameRoom: GameRoom;
  onClick?: (gameRoom: GameRoom) => void;
};

export const GameRoomItem: React.FC<GameRoomItemProps> = ({
  gameRoom,
  onClick = () => undefined,
}) => {
  const { id, name, player1, player2 } = gameRoom;
  return (
    <GameRoomWrapper id={id}>
      <GameRoomItemStyle
        data-testid="joke-item"
        onClick={() => {
          onClick(gameRoom);
        }}
      >
        <GameRoomHighlight />
        <GameRoomFlex>
          <div>
            <GameRoomTitle>
              <b>Name: </b>
              {name}
            </GameRoomTitle>
            <GameRoomPlayers>
              <b>Current Players: </b>
              {player1.name}, {player2.name}
            </GameRoomPlayers>
          </div>
        </GameRoomFlex>
      </GameRoomItemStyle>
    </GameRoomWrapper>
  );
};
