import React, { useState, useContext } from 'react'
import { createPortal } from 'react-dom'

import Modal from 'components/Modal'

const ModalContext = React.createContext();

const ModalProvider = props => {
  const [state, setState] = useState({
    isOpen: false,
    content: null,
  });

  const open = component => {
    setState({
      isOpen: true,
      content: component,
    })
  };

  const close = () => {
    setState({
      ...state,
      isOpen: false,
    })
  };

  return (
    <>
      <ModalContext.Provider value={{ state, open, close }}>{props.children}</ModalContext.Provider>
      {createPortal(
        <Modal isOpen={state.isOpen} onClose={close}>
          {state.content}
        </Modal>,
        document.body,
      )}
    </>
  )
};

const withModal = Component => props => {
  const value = useContext(ModalContext)
  return <Component modal={value} {...props} />
};

export { ModalProvider, withModal }
