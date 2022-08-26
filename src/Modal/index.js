import React from "react";
import ReactDom from "react-dom";
import './Modal.css';
import { TodoContext } from "../hooks/useTodos";

function Modal( props ) {
  return ReactDom.createPortal(
    <div className="ModalBackground">
      {props.children}
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };