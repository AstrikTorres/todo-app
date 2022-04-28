import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoItem } from '../TodoItem';
import { TodoList } from '../TodoList'
import { TittleApp } from '../TittleApp'
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';
import { TodosError } from "../loadingSkeleton/TodosError";
import { TodosLoading } from "../loadingSkeleton/TodosLoading";
import { EmptyTodos } from "../loadingSkeleton/EmptyTodos";
import { DeleteCompletedButton } from "../DeleteCompletedButton";
import { EditTodo } from "../EditTodo";

function AppUI() {
  const { 
    error, 
    loading, 
    searchedTodos, 
    toggleCompleteTodo, 
    deleteTodo,
    openModal,
    setOpenModal,
    openModalEdit,
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TittleApp/>

      <TodoCounter/>

      <TodoSearch/>

      <TodoList>
        {error && <TodosError/>}
        {loading && 
          new Array(4).fill().map((item, index)=>(
            <TodosLoading key={index} />
          ))
        }
        {(!loading && !searchedTodos.length) && <EmptyTodos/>}
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
          <TodoForm></TodoForm>
        </Modal>
      )}

      {!!openModalEdit && (
        <Modal>
          <EditTodo></EditTodo>
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
        whidth="100%"
        height="42px"
      />

      <DeleteCompletedButton
        whidth="100%"
        height="42px"
      />

    </React.Fragment>
  );
}

export { AppUI };