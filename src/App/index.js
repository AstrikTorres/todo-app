import React from 'react'
import { useTodos } from "../hooks/useTodos";
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
import { SignUp } from "../SignUp";
import { useApiUsers } from '../hooks/useApiUsers';
import { useApiTodos } from '../hooks/useApiTodos';

function App() {
  
  const {
    openModalLogin,
    setOpenModalLogin,
    isLoged,
    setIsLoged,
    token,
    saveToken,
    getAuth,
    openModalSignUp,
    setOpenModalSignUp
  } = useApiUsers();
  const {
    callApi,
    loadingApi,
    errorApi,
    result
  } = useApiTodos(token);
  const {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    toggleCompleteTodo,
    addTodo,
    editTodo,
    deleteTodo,
    deleteCompletedTodos,
    openModal,
    setOpenModal,
    openModalEdit, 
    setOpenModalEdit,
    todoValue,
    setTodoValue,
    verifyTodoDuplied,
    completedTodosArr,
    todoId,
    setTodoId,
    todoCompleted,
    setTodoCompleted
  } = useTodos();
  return (
    <React.Fragment>
      <TittleApp loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />

        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TittleApp>
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
              key={todo.id}
              id={todo.id}
              setTodoId={setTodoId}
              setTodoCompleted={setTodoCompleted}
              text={todo.text}
              setTodoValue={setTodoValue}
              setOpenModalEdit={setOpenModalEdit}
              onComplete={() => {
                toggleCompleteTodo(todo.text);
                callApi('todos', 'PUT', { ...todo, completed: todo.completed });
              }}
              onDelete={() => {
                deleteTodo(todo.text); 
                callApi(`todos/${todo.id}`, 'DELETE');
              }}
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
            token={token}
            callApi={callApi}
            result={result}
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
            todoId={todoId}
            todoCompleted={todoCompleted}
            callApi={callApi}
          />
        </Modal>
      )}

      {(!!openModalLogin && !isLoged && !loading) && (
        <Modal>
          <Login
            setOpenModalLogin={setOpenModalLogin}
            setIslogged={setIsLoged}
            saveToken={saveToken}
            setOpenModalSignUp={setOpenModalSignUp}
          />
        </Modal>
      )}

      {(!!openModalSignUp && !isLoged) && (
        <Modal>
          <SignUp
            setOpenModalSignUp={setOpenModalSignUp}
            setIslogged={setIsLoged}
            saveToken={saveToken}
            setOpenModalLogin={setOpenModalLogin}
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
        deleteCompletedTodos={() => {
          deleteCompletedTodos();
          callApi('todos/list', 'DELETE', completedTodosArr);
        }}
      />

    </React.Fragment>
  );
}

export default App;
