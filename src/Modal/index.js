import React from "react";
import ReactDom from "react-dom";
import './Modal.css';
import { TodoContext } from "../TodoContext";

function Modal( props ) {
  const { 
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  const onClickOut = () => {
    setOpenModal(prevState => !prevState);
  };

  return ReactDom.createPortal(
    <div className="ModalBackground">
      {props.children}
      <button
        className="button"
        onClick={onClickOut}
      >
        Close
      </button>
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };