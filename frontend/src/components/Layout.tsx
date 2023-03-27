import React, { useContext } from "react";
import styled, { css } from "styled-components/macro";
import { Connect4Img } from "../img/Connect4";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthenticationContext";
import { Button, DangerButton } from "./Button";

export const headerHeight = "85px";
export const footerHeight = "50px";

const MaxWidth = css``;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${MaxWidth}
  height: 95%;
`;

const Footer = styled.footer`
  ${MaxWidth}
  height: 5%;
`;

const ContentLayout = styled.div`
  width: 78%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const NavigationList = styled.div`
  margin-right: 2%;

  @media only screen and (max-width: 999px) {
    display: none;
  }
  @media only screen and (min-width: 1000px) {
    display: block;
  }
`;

const NaviSectionWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 10px;
  padding: 10px;
`;

const NavigationItem = styled.div`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
`;

const LogoTitel = styled.div`
  position: relative;
  padding: 10px;
`;

const Titel = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.7rem;
  text-shadow: 0 0 4px #ffffff;
`;

export const Layout: React.FC = ({ children }) => {
  const {
    actions: { logout },
  } = useContext(authContext);
  return (
    <>
      <Main>
        <ContentLayout>
          <NavigationList>
            <NaviSectionWrapper>
              <LogoTitel>
                <Connect4Img />
                <Titel>
                  Connect
                  <span
                    css={`
                      color: red;
                      text-shadow: 0 0 4px #ffffff;
                    `}
                  >
                    4
                  </span>
                </Titel>
              </LogoTitel>
            </NaviSectionWrapper>
            <NaviSectionWrapper>
              <NavigationItem>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <Button>Dashboard</Button>
                </Link>
              </NavigationItem>
              <NavigationItem>
                <Link to="/newgame" style={{ textDecoration: "none" }}>
                  <Button>New Game</Button>
                </Link>
              </NavigationItem>
              <NavigationItem>
                <Link to="/settings" style={{ textDecoration: "none" }}>
                  <Button>Settings</Button>
                </Link>
              </NavigationItem>
              <NavigationItem>
                <Link to="/help" style={{ textDecoration: "none" }}>
                  <Button>Help</Button>
                </Link>
              </NavigationItem>
              <NavigationItem>
                <DangerButton
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </DangerButton>
              </NavigationItem>
            </NaviSectionWrapper>
          </NavigationList>
          {children}
        </ContentLayout>
      </Main>
      <Footer>&copy; Connect4 2021</Footer>
    </>
  );
};
