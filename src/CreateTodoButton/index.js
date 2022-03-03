import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton() {
  const onClickButton = (msg) => {
    alert(msg)
  };

  return (
    <button
      className="button"
      onClick={() => {onClickButton('My msg')}}
    >
      Add todo
    </button>
  );
}

export { CreateTodoButton };