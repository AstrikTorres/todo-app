import React from "react";
import "./TodoList.css";

function TodoList(props) {
  return (
    <section className="container">
      <ul className="list">
        {props.children}
      </ul>
    </section>
  );
}

export { TodoList };