import styled from "styled-components";

export const FieldColumn = styled.div`
    background: ${(props) => props.theme.colors.gameBoardColumnColor};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.colors.gameBoardColumnColor};

    outline: 0;
    &:hover {
        border: 2px solid ${(props) =>
          props.theme.colors.gameBoardColumnBorderHighlightColor};
    }
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
`;
