import React from "react";
import './TodosLoading.css';

function loadingCounter() {
  return (
    <div className="todo-counter-loading contenedor">
      <div className="loader" id="loader"></div>
    </div>
  );
}

export { loadingCounter };