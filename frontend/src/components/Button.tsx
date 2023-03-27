import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border: 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.fontColor};
  line-height: 22.4px;
  padding: 10.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  margin-bottom: 10px;
  margin-top: 10px;

  outline: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHoverColor};
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const ActiveButton = styled.button`
  background-color: ${(props) => props.theme.colors.listHoverColor};
  border: 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.fontColor};
  line-height: 22.4px;
  padding: 10.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  outline: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHoverColor};
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const VerticalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flexdirection: row;
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  margin-top: 7%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DisabledButton = styled.button`
  background-color: ${(props) => props.theme.colors.joinButton};
  border: 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.text};
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  margin-bottom: 20px;
  margin-top: 10px;

  outline: 0;

    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const DangerButton = styled(Button)`
  background-color:  ${(props) => props.theme.colors.dangerButton};
  outline: 0;
  &:hover {
    background-color:  ${(props) => props.theme.colors.dangerButton};
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const ChangeNameButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondaryFontColor};
  border: 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.fontColor};
  line-height: 15px;
  padding: 10.2px 14.4px;
  text-align: center;
  width: 5%;
  font-weight: 500;
  transition-duration: 250ms;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const DownloadButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: 0px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.fontColor};
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  outline: 10;
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
