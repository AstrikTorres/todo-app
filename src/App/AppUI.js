import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoItem } from '../TodoItem';
import { TodoList } from '../TodoList'
import { TittleApp } from '../TittleApp'
import { Modal } from '../Modal';

function AppUI() {
  const { 
    error, 
    loading, 
    searchedTodos, 
    toggleCompleteTodo, 
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TittleApp/>

      <TodoCounter/>

      <TodoSearch/>

      <TodoList>
        {error && <p className="msg">Failed to load</p>}
        {loading && <p className="msg">Loading...</p>}
        {(!loading && !searchedTodos.length) && <p className="msg">Create a TODO!</p>}
        {(!loading && !error) &&
          searchedTodos.map(todo => (
            <TodoItem
              completed={todo.completed}
              key={todo.text}
              text={todo.text}
              onComplete={() => toggleCompleteTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))
        }
      </TodoList>

      {!!openModal && (
        <Modal>
          <p>Write your new TODO</p>
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
        whidth="100%"
        height="42px"
      />

    </React.Fragment>
  );
}

export { AppUI };