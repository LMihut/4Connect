import styled from "styled-components";

export const GameHeaderWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 75px;
  padding: 10px;
  margin-right: 2%;
`;

export const PlayerNameWrapperActive = styled.div`
  border-radius: 10px;
  position: relative;
  text-align: center;
  height: 100%;
  padding: 15px;
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;

  animation: blinker 1.5s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

export const PlayerNameWrapperInactive = styled.div`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 10px;
  position: relative;
  text-align: center;
  height: 100%;
  padding: 15px;
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
`;
