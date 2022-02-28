import React from "react";
import "./TodoItem.css";

function TodoItem(props) {
  const onComplete = () => {
    alert('Completaste el todo ' + props.text)
  }

  const onDelete = () => {
    alert('Borraste el todo ' + props.text)
  }

  return (
    <li
      className={ `todo-item ${ props.completed && 'todo-item--completed' }` }
    >
      <span
        className={`todo-check ${props.completed && 'check--checked'}`}
        onClick={onComplete}
      >
        ᄼ
      </span>
      <p className={`todo-text ${props.completed && 'todo-text--completed'}`}>{props.text}</p>
      <span
        className="todo-delete"
        onClick={onDelete}
      >
        X
      </span>
    </li>
  );
}

export { TodoItem };