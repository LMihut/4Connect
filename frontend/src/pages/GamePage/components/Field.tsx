import styled from "styled-components";

export const StyledField = styled.div`
  border: 2px solid ${(props) => props.theme.colors.gameBoardFieldBorderColor};
  border-radius: 50%;
  margin: 2px;
  background_color: ${(props) => props.theme.colors.gameBoardColumnColor};
`;
