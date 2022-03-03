import React from "react";
import './TodoCounter.css';

function TodoCounter({total, completed}) {
  return (
    <p className="TodoCounter">Completed {completed} to {total}</p>
  );
}

export { TodoCounter };