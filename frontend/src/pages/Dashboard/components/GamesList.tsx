import styled from "styled-components";
import { Player } from "./Leaderboard";
import React, { useContext } from "react";
import { authContext } from "../../../context/AuthenticationContext";

export const PlayedGamesTitel = styled.p`
  text-align: center;
  font-size: 1.3rem;
  line-height: 28px;
`;

export interface Game {
  id: string;
  players: Player[];
  winner: Player;
  createdAt: string;
}

const GamesPlayedWrapper = styled.div`
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  overflow-y: auto;
`;

const Titles = styled.div`
  display: flex;
  margin-bottom: 2px;
  border: 0px;
  background-color: ${(props) => props.theme.colors.titleWrapperColor};
  font-size: 10px;
  padding: 0 2px 0 2px;
`;

const Title = styled.p`
  display: inline-block;
  width: 33.33%;
  text-align: center;
`;

const GameWrapper = styled.div`
  height: 9%;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.backgroundColor};
  display: flex;
  font-size: 1rem;
  margin: 4px 0 4px 0;
`;

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 33.33%;
  line-height: 25px;
`;

const PlayerStyle = styled.p`
  display: inline-block;
  margin: 0;
  text-align: center;
`;

const GameText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  text-align: center;
`;

export const GamesList: React.FC<{ games: Game[] }> = ({ games }) => {
  const { token } = useContext(authContext);

  const getGameStatus = (game: Game) => {
    if (!game.winner) {
      return "draw";
    }
    if (JSON.parse(atob(token!.split(".")[1])).id === game.winner.id) {
      return "won";
    } else {
      return "lost";
    }
  };

  return (
    <GamesPlayedWrapper>
      <PlayedGamesTitel>Played Games</PlayedGamesTitel>
      <Titles>
        <Title>Players</Title>
        <Title>Result</Title>
        <Title>Date</Title>
      </Titles>
      {games.map((game, index) => {
        return (
          <GameWrapper key={index}>
            <PlayersWrapper>
              <PlayerStyle>
                {game.players[0].name + " (" + game.players[0].eloScore + ")"}
              </PlayerStyle>
              <PlayerStyle>
                {game.players[1].name + " (" + game.players[1].eloScore + ")"}
              </PlayerStyle>
            </PlayersWrapper>
            <GameText>{getGameStatus(game)}</GameText>
            <GameText>{game.createdAt}</GameText>
          </GameWrapper>
        );
      })}
    </GamesPlayedWrapper>
  );
};
