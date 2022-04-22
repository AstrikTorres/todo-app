import React from "react";
import { TodoContext } from "../TodoContext";
import './TodoCounter.css'; 

function TodoCounter() {
  const {totalTodos, completedTodos} = React.useContext(TodoContext);
  return (
    <p className="TodoCounter">Completed {completedTodos} to {totalTodos}</p>
  );
}

export { TodoCounter };