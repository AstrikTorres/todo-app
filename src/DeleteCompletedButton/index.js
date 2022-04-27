import React from "react";
import { TodoContext } from "../TodoContext";

function DeleteCompletedButton(props) {
  const { 
    deleteCompletedTodos
  } = React.useContext(TodoContext);

  const onClickButton = () => {
    deleteCompletedTodos();
  }
  
  return (
    <button
      className="button"
      onClick={onClickButton}
      style={{
        width: props.whidth,
        height: props.height,
        background: "red",
        marginTop: "10px",
      }}
    >
      Delete completed todos
    </button>
  );
}

export { DeleteCompletedButton };