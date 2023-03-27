import styled from "styled-components";
import { ContentWrapper, Layout } from "../../components/Layout";
import React from "react";

const HelpPageBody = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HelpPageHeader = styled.div`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  font-size: 30px;
  margin: 10px;
`;

export const HelpPageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 10px;
  text-align: start;
  padding: 15px;
  font-size: 25px;
  margin: 10px;
  overflow-y: scroll;
`;

export const HelpPage = () => {
  return (
    <Layout>
      <ContentWrapper>
        <HelpPageBody>
          <HelpPageHeader>Help</HelpPageHeader>
          <HelpPageContainer>
            <p>{textDummy}</p> <br />
            <p>
              <h4>{textPages}</h4>
            </p>{" "}
            <br />
            <p>
              <h4>{loginPage}</h4>
              {loginPageText}
            </p>{" "}
            <br />
            <p>
              <h4>{dashboardPage}</h4>
              {dashboardPageText}
            </p>{" "}
            <br />
            <p>
              <h4>{newGamePage}</h4>
              {newgamePageText}
            </p>{" "}
            <br />
            <p>
              <h4>{gamePage}</h4> {gamePageText}
            </p>{" "}
            <br />
            <p>
              <h4>{settingsPage}</h4>
              {settingsPageText}
            </p>
          </HelpPageContainer>
        </HelpPageBody>
      </ContentWrapper>
    </Layout>
  );
};

const textDummy =
  "The game Connect4 was developed by a group of students at Darmstadt University of Applied Sciences as part of the block course 'Advanced Web Development' in SS 2021. \n";
const textPages = "Pages: \n";
const loginPage = "Login/Register Page:";
const loginPageText =
  "Upon accessing the login page you will have to register as a user in order to be able to play the game.";

const dashboardPage = "Dashboard Page: \n";
const dashboardPageText =
  "After logging in you will be directed to the dashboard page, in which you will find the following features: Played Games, Player Profile and the Leaderboard.";

const newGamePage = "New Game Page: ";
const newgamePageText =
  "After you click the button Next Game in Dashboard you will be directed to the new game page. " +
  "In this page you can specify the preferred settings that you want to play the game with such as :" +
  "Board Width, Board Heigth, Row count to win. " +
  "Afterwards you can create a room for the game and wait until an opponent comes. You can do this by clicking Create Game Session. " +
  "Otherwise you can see all the available rooms and choose one of them unless there is more than two players in the room. " +
  "When you have already chosen a room you can find all the details regarding that room on the Game Room Details section on the right. " +
  "After choosing a room you can join this room to play by clicking the Join as Player button. ";

const gamePage = "Game Page: ";
const gamePageText =
  "After choosing your preferred settings and joining a room you will be directed to the main page of this project, which is the game page. " +
  "In this page you can actually play the game against an opponent along with communicating with him through the chat box. " +
  "It is also possible to redo some moves with the help of the buttons on the bottom. ";

const settingsPage = "Settings Page: ";
const settingsPageText =
  "In this page you have the ability to either change your name or to change the theme of the website. " +
  "There are two available themes Dark Theme and Light Theme. ";
