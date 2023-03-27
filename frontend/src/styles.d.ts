import {} from "styled-components/cssprop";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      backgroundColor: string;
      listBackgroundColor: string;
      buttonColor: string;
      buttonHoverColor: string;
      mainButtonColor: string;
      mainButtonHoverColor: string;
      fontColor: string;
      secondaryFontColor: string;
      shadowColor: string;
      primary: string;
      listHoverColor: string;
      gameBoardColumnColor: string;
      gameBoardColumnBorderHighlightColor: string;
      gameBoardFieldBorderColor: string;
      text: string;
      boardColor: string;
      titleWrapperColor: string;
      dangerButton: string;
      joinButton: string,

      player1Color: string;
      player2Color: string;
    };
  }
}
