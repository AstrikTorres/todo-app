import React from "react";
import './TodoCounter.css'; 

function TodoCounter({ totalTodos, completedTodos, loading }) {

  return (
    <p className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}>Completed {completedTodos} to {totalTodos}</p>
  );
}

export { TodoCounter };