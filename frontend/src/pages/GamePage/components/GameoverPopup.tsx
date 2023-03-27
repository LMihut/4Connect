import { useContext } from "react";
import { useModal, modalStyle } from "./ReadyCheck";

import { SocketContext } from "../../../context/socket.context";

export const GameoverPopup = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  console.log("linter", open, isOpen);
  const socketContext = useContext(SocketContext);

  return (
    <div>
      <Modal>
        <div style={modalStyle}>
          <button
            style={{
              position: "absolute",
              right: 40,
              top: 20,
              width: 20,
              height: 20,
              backgroundColor: "#7e7e7e",
              border: 0,
              borderRadius: 2,
            }}
            onClick={close}
          >
            X
          </button>
          <h1>GAME OVER</h1>
          <p>{socketContext.gameState?.winner} won </p>
          <p>
            {socketContext.gameState?.winner ===
            socketContext.joinedRoom?.player1.name
              ? socketContext.joinedRoom?.player2.name
              : socketContext.joinedRoom?.player1.name}{" "}
            lost
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          ></div>
        </div>
      </Modal>
    </div>
  );
};
