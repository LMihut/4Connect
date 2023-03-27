import styled, { ThemeContext } from "styled-components";

import { useEffect } from "react";
import { ContentWrapper, Layout } from "../../components/Layout";
import React, { useContext, useState } from "react";
import { ButtonWrapper, SettingsContainer } from "./components/GameSettings";
import { Button } from "../../components/Button";

import {
  GameRoom,
  GameRoomItem,
  GameRoomList,
  GameRoomListLayout,
} from "./components/GameRoomList";
import { authContext } from "../../context/AuthenticationContext";
import { GameDetails, GameDetailsEmpty } from "./components/GameDetails";
import { SocketContext } from "../../context/socket.context";
import { useHistory } from "react-router";
import { game } from "../GamePage/GamePage";

const NewgameBody = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ComponentHeadline = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 10px;
  position: relative;
  text-align: center;
  padding: 15px;
  font-size: 25px;
  margin-top: 12%;
  margin-bottom: 12%;
`;

export const NewgamePage = () => {
  const [gameSelected, setGameSelected] = useState<GameRoom | null>(null);
  const { token } = useContext(authContext);
  const { socket, rooms } = useContext(SocketContext);
  const theme = useContext(ThemeContext);

  let history = useHistory();
  const userName = JSON.parse(atob(token!.split(".")[1])).name;

  useEffect(() => {
    socket.emit("connectplayer", {
      name: userName,
    });

    function receive() {}

    receive();
  }, [socket, userName]);

  const joinAsPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      gameSelected! &&
      userName !== gameSelected!.id &&
      gameSelected!.player2.name === ""
    ) {
      if (game) game.suspendGame();
      socket.emit("joinedRoom", {
        roomName: gameSelected?.id,
        player: {
          id: JSON.parse(atob(token!.split(".")[1])).id,
          name: JSON.parse(atob(token!.split(".")[1])).name,
          eloScore: JSON.parse(atob(token!.split(".")[1])).eloScore,
          ready: false,
        },
      });

      history.push("/game");
    }
  };

  return (
    <Layout>
      <ContentWrapper>
        <NewgameBody>
          <SettingsContainer ws={socket} />
          <GameRoomListLayout>
            <ComponentHeadline> Game Rooms</ComponentHeadline>
            <GameRoomList>
              {rooms.map((gameRoom) => (
                <GameRoomItem
                  key={gameRoom.id}
                  onClick={() => {
                    for (let gameRoomElement of rooms) {
                      if (gameRoomElement.id === gameRoom.id) {
                        document.getElementById(
                          gameRoomElement.id
                        )!.style.backgroundColor = "green";
                        document.getElementById(
                          gameRoomElement.id
                        )!.style.borderRadius = "10px";
                        setGameSelected(gameRoom);
                      } else {
                        document.getElementById(
                          gameRoomElement.id
                        )!.style.backgroundColor = theme.colors.boardColor;
                      }
                    }
                  }}
                  gameRoom={gameRoom}
                />
              ))}
            </GameRoomList>
            <ButtonWrapper>
              <Button onClick={joinAsPlayer}>Join</Button>
            </ButtonWrapper>
          </GameRoomListLayout>
          {gameSelected && (
            <GameDetails
              gameDetails={
                rooms.find((x) => x.id === gameSelected?.id)
                  ? gameSelected!
                  : null
              }
            />
          )}
          {!gameSelected && <GameDetailsEmpty />}
        </NewgameBody>
      </ContentWrapper>
    </Layout>
  );
};
