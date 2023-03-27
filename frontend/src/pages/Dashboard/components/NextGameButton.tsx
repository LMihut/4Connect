import styled from "styled-components/macro";
import React from "react";
import { Link } from "react-router-dom";

const NextGameButtonLayout = styled.div`
  border-radius: 10px;
  height: 15%;
`;

const NextGameButtonButton = styled.button`
  background-color: ${(props) => props.theme.colors.mainButtonColor};
  color: ${(props) => props.theme.colors.text};
  border: 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition-duration: 250ms;
  line-height: 50px;
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    background-color: ${(props) => props.theme.colors.mainButtonHoverColor};
  }
`;

export const NextGameButton = () => {
  return (
    <NextGameButtonLayout>
      <Link to="/newgame">
        <NextGameButtonButton>Next Game</NextGameButtonButton>
      </Link>
    </NextGameButtonLayout>
  );
};
