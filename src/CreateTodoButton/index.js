import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const onClickButton = () => {
    props.setOpenModal(true);
  };

  return (
    <button
      className="button"
      onClick={onClickButton}
    >
      Add todo
    </button>
  );
}

export { CreateTodoButton };