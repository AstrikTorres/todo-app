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
import { Login } from "../Login";

function AppUI() {
  const {
    error,
    loading,
    loadingToken,
    errorToken,
    searchedTodos,
    toggleCompleteTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    openModalEdit,
    openModalLogin,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    setOpenModalLogin,
    setIsLoged,
    isLoged,
    saveToken,
    addTodo,
    verifyTodoDuplied,
    setOpenModalEdit,
    editTodo,
    todoValue,
    setTodoValue,
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TittleApp/>

      <TodoCounter
        totalTodos={totalTodos}
        completedTodos={completedTodos}
      />

      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

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
              setTodoValue={setTodoValue}
              setOpenModalEdit={setOpenModalEdit}
              onComplete={() => toggleCompleteTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))
        }
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm
            setOpenModal={setOpenModal}
            addTodo={addTodo}
            verifyTodoDuplied={verifyTodoDuplied}
          />
        </Modal>
      )}

      {!!openModalEdit && (
        <Modal>
          <EditTodo
            setOpenModalEdit={setOpenModalEdit}
            editTodo={editTodo}
            todoValue={todoValue}
            verifyTodoDuplied={verifyTodoDuplied}
          />
        </Modal>
      )}

      {(!!openModalLogin && !isLoged) && (
        <Modal>
          <Login
            setOpenModalLogin={setOpenModalLogin}
            setIslogged={setIsLoged}
            saveToken={saveToken}
          />
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