import React from "react";
import { TodoContext } from "../TodoContext";
import './TodoCounter.css'; 

function TodoCounter() {
  const {
    totalTodos, 
    completedTodos,     
    error, 
    loading, 
    searchedTodos, 
  } = React.useContext(TodoContext);

  return (
    (!error && !loading) && <p className="TodoCounter">Completed {completedTodos} to {totalTodos}</p>
  );
}

export { TodoCounter };