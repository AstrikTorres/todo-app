import React from "react";
import './TodoCounter.css'; 

function TodoCounter({ totalTodos, completedTodos }) {

  return (
    <p className="TodoCounter">Completed {completedTodos} to {totalTodos}</p>
  );
}

export { TodoCounter };