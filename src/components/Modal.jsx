import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.backdrop};
`;
const ContentWrapper = styled.div`
  position: relative;
  z-index: 300;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border: 1px solid transparent;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 32px;
  min-height: 190px;
  max-height: 80vh;
  width: 512px;
`;

function Modal(props) {
  const { children, isOpen, onClose, backdropCloses } = props;

  function closeModal () {
    onClose && onClose();
  }

  function onBackdropClick (e) {
    if (e.target === e.currentTarget) {
      backdropCloses && closeModal();
    }
  }

  return createPortal(
    isOpen && (
      <Backdrop onClick={onBackdropClick} >
        <ContentWrapper>
          {children && React.cloneElement(children, { closeModal })}
        </ContentWrapper>
      </Backdrop>
    ),
    document.body,
  )
};

export default Modal
