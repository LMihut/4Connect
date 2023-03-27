import styled from 'styled-components'

export const Container = styled.div`
    height: 80px;
    border-radius: 25px;
    background: ${props => props.theme.colors.boardColor};
    color: ${props => props.theme.colors.text};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 1rem;
`