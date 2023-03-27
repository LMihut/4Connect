import styled from "styled-components";

export const ReplayButtonWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 75px;
  padding: 10px;
  margin-right: 10px;
`;

export const ReplayButtonWrapperSingle = styled.div`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 10px;
  position: relative;
  padding: 8px;
  
  font-size: 2.3rem;
  
  margin-left: 10px;
  margin-right: 10px;

  transition-duration: 250ms;
  outline: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHoverColor};
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
`;

export const ArrowLeftButton = styled.div`
  width: 0;
  height: 0;

  border-top: 20px solid transparent;
  border-right: 60px solid ${(props) => props.theme.colors.fontColor};
  border-bottom: 20px solid transparent;

  margin-right: 15px;
  margin-left: 10px;

  outline: 0;
`;

export const ArrowRightButton = styled.div`
  width: 0;
  height: 0;

  border-top: 20px solid transparent;
  border-left: 60px solid ${(props) => props.theme.colors.fontColor};
  border-bottom: 20px solid transparent;

  margin-right: 10px;
  margin-left: 15px;

  outline: 0;
`;

export const ArrowRightDangerButton = styled.div`
  width: 0;
  height: 0;

  border-top: 20px solid transparent;
  border-left: 60px solid ${(props) => props.theme.colors.dangerButton};
  border-bottom: 20px solid transparent;

  margin-right: 10px;
  margin-left: 15px;

  outline: 0;
`;

export const ArrowLeftDangerButton = styled.div`
  width: 0;
  height: 0;

  border-top: 20px solid transparent;
  border-right: 60px solid ${(props) => props.theme.colors.dangerButton};
  border-bottom: 20px solid transparent;

  margin-right: 10px;
  margin-left: 15px;

  outline: 0;
`;
