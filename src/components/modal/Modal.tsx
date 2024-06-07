import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const DialogBox = styled.dialog`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 30px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #f7f8ff;
  z-index: 10000;
  position: relative;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
`;

export default Modal;
