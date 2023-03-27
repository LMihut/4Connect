import styled from "styled-components/macro";
import React from "react";
import { PlayerDetails } from "../DashboardPage";

const PlayerLayout = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  height: 20%;
  width: 100%;
  margin-right: 10px;
  margin-left: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const PlayerTitel = styled.p`
  font-size: 1.3rem;
  line-height: 28px;
  text-align: center;
  border-bottom: 1px solid white;
`;

const PlayerStatsWrapper = styled.div`
  direction: flex;
  flex-direction: column;
  line-height: 33px;
`;

const PlayerText = styled.p`
  display: inline-block;
  width: 50%;
`;
const PlayerTextValue = styled.p`
  display: inline-block;
  width: 50%;
  text-align: end;
`;

export interface Player {
  id: string;
  name: string;
  eloScore: number;
  ready: boolean;
}

export const PlayerProfile: React.FC<{ playerDetails: PlayerDetails | null }> =
  ({ playerDetails }) => {
    return (
      <PlayerLayout>
        <PlayerTitel>{playerDetails?.name}</PlayerTitel>
        <PlayerStatsWrapper>
          <PlayerText>Elo</PlayerText>
          <PlayerTextValue>{playerDetails?.eloScore}</PlayerTextValue>
        </PlayerStatsWrapper>
        <PlayerStatsWrapper>
          <PlayerText>
            <span
              css={`
                color: #00f800;
              `}
            >
              Won
            </span>
          </PlayerText>
          <PlayerTextValue>{playerDetails?.won}</PlayerTextValue>
        </PlayerStatsWrapper>
        <PlayerStatsWrapper>
          <PlayerText>
            <span
              css={`
                color: red;
              `}
            >
              Lost
            </span>
          </PlayerText>
          <PlayerTextValue>{playerDetails?.lost}</PlayerTextValue>
        </PlayerStatsWrapper>
        <PlayerStatsWrapper>
          <PlayerText>Winrate</PlayerText>
          <PlayerTextValue>{playerDetails?.winrate}%</PlayerTextValue>
        </PlayerStatsWrapper>
      </PlayerLayout>
    );
  };
