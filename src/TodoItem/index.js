import React from "react";
import "./TodoItem.css";
import { TodoContext } from "../TodoContext";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";

function TodoItem(props) {
  return (
    <li
      className={ `todo-item ${ props.completed && 'todo-item--completed' }` }
    >
      {
        !props.completed && 
        <ImCheckboxUnchecked
          size="20px"
          className={`todo-check`}
          onClick={props.onComplete}
        />
      }
      {
        props.completed &&
        <ImCheckboxChecked
          size="20px"
          className={`todo-check`}
          onClick={props.onComplete}
        />
      }
      <p 
        className={`todo-text ${props.completed && 'todo-text--completed'}`}
      >
        {props.text}
      </p>
      <div className={"options-container"}>
        <MdEdit
          size="25px"
          className="options-icon"
          onClick={() => {
            props.setTodoValue(props.text);
            props.setOpenModalEdit(true);
          }}
        />
        <TiDelete
          size="30px"
          className="options-icon options-icon--delete"
          onClick={props.onDelete}
        />
      </div>
    </li>
  );
}

export { TodoItem };