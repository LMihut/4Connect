import styled from "styled-components";
import {
    ContentWrapper,
    footerHeight,
    headerHeight,
    Layout,
} from "../../components/Layout";
import React, {useContext, useState} from "react";
import {
    advanceButtonClicked,
    GameBoard,
    GameBoardWrapper,
    resign,
    reverseButtonClicked,
    toLastStep,
} from "../GamePage/components/GameBoard";

import {
    ArrowLeftButton,
    ArrowLeftDangerButton,
    ArrowRightButton,
    ArrowRightDangerButton,
    ReplayButtonWrapper,
    ReplayButtonWrapperSingle,
} from "../GamePage/components/ReplayButtons";

import {
    GameHeaderWrapper,
    PlayerNameWrapperActive,
    PlayerNameWrapperInactive,
} from "../GamePage/components/GameHeader";


import {Button, VerticalButtonWrapper} from "../../components/Button";
import {Game, GameState, GameStateEnum, GameStep, Player, PlayerStateEnum} from "../GamePage/components/GameEngine";


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

interface OfflineGameContextInterface {
    gameState: GameState;
}

export const OfflineGameContext = React.createContext<OfflineGameContextInterface>({
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
});

export var game: Game;

export const OfflineGamePage = () => {
    
    const [, setStepCounterRerenderer] = useState(0);
    const { gameState } = useContext(OfflineGameContext);
    let replay: boolean;

    if (gameState !== undefined) {
        game = new Game(gameState.steps[0].x, gameState.steps[0].y, gameState.connect);
        game.setGame(gameState);
        replay = true;
    } else {
        game = new Game();
        replay = false;
    }


    const renderHeader = function (replay: boolean) {
        if (replay) {
            return (
                <GameHeaderWrapper>
                    {game.winner !== undefined && (
                        <PlayerNameWrapperInactive>
                            {game.getPlayer(game.winner!).name} won
                        </PlayerNameWrapperInactive>
                    )}
                    {game.winner === undefined && (
                        <PlayerNameWrapperInactive>
                            No Winner
                        </PlayerNameWrapperInactive>
                    )}
                </GameHeaderWrapper>
            );
        } else {
            return (
                <GameHeaderWrapper>
                    {game && game.playerIds.length > 0 && game.activePlayer !== undefined && (
                        <PlayerNameWrapperActive
                            style={{backgroundColor: game.getPlayer(game.activePlayer).color}}
                        >
                            {game.getPlayer(game.activePlayer).name}
                        </PlayerNameWrapperActive>
                    )}
                    {game && game.playerIds.length === 0 && (
                        <PlayerNameWrapperInactive>
                            {"No Player"}
                        </PlayerNameWrapperInactive>
                    )}
                </GameHeaderWrapper>
            );
        }
    }

    const rerenderStepCounter = function () {
        setStepCounterRerenderer(game.getCurrentStep());
    };
    //calc(100vh - ${headerHeight} - ${footerHeight});
    return (
        <Layout>
            <ContentWrapper>
                <GameBody>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "100%",
                        }}
                    >
                        <LeftGameBodyWrapper>
                            {renderHeader(replay)}
                            <GameBoardWrapper onClick={rerenderStepCounter}>
                                <GameBoard/>
                            </GameBoardWrapper>
                            <ReplayButtonWrapper onClick={rerenderStepCounter}>
                                <ReplayButtonWrapperSingle>
                                    <ArrowLeftDangerButton/>
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
                                    <ArrowRightDangerButton/>
                                </ReplayButtonWrapperSingle>
                            </ReplayButtonWrapper>
                        </LeftGameBodyWrapper>

                        <RightGameBodyWrapper>
                            <VerticalButtonWrapper style={{height: 75}}>
                                {!replay && (
                                    <Button style={{width: 100}} onClick={resign}>
                                        Resign
                                    </Button>
                                )}
                                <Button style={{width: 100}}>Dashboard</Button>
                            </VerticalButtonWrapper>
                        </RightGameBodyWrapper>
                    </div>
                </GameBody>
            </ContentWrapper>
        </Layout>
    );
};
