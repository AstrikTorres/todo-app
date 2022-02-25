import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton() {
  const onClickButton = (msg) => {
    alert(msg)
  };

  return (
    <a
      className="button"
      onClick={() => {onClickButton('My msg')}}
    >
      Add todo
    </a>
  );
}

export { CreateTodoButton };