import React from "react";
import './TodosLoading.css';

function TodosLoading() {
  return (
    <div className="todo-item-loading contenedor">
      <div className="loader" id="loader"></div>
    </div>
  );
}

export { TodosLoading };