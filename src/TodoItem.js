import React from "react";
import "./TodoItem.css";

function TodoItem(props) {
  return (
    <li className={`todo-item ${props.completed && 'todo-item--completed'}`}>
      <span className={`todo-check ${props.completed && 'check--checked'}`}>ᄼ</span>
      <p className={`todo-text ${props.completed && 'todo-text--completed'}`}>{props.text}</p>
      <span className="todo-delete">X</span>
    </li>
  );
}

export { TodoItem };