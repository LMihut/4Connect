import React from "react";
import styled, { css } from "styled-components/macro";
const footerHeight = "50px";

export const MaxWidthCSS = css`
  max-width: 860px;
  margin: auto;
`;

const Main = styled.main`
  min-height: calc(100vh - ${footerHeight});
  padding: 0 25px;
  ${MaxWidthCSS}
`;

const Footer = styled.footer`
  height: ${footerHeight};
  padding: 0 25px;
  ${MaxWidthCSS};
`;

export const UnauthenticatedLayout: React.FC = ({ children }) => {
  return (
    <>
      <Main>{children}</Main>
      <Footer> &copy; Connect4 2021</Footer>
    </>
  );
};
