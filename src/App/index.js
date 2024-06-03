import React from 'react'
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoItem } from '../TodoItem';
import { TodoList } from '../TodoList'
import { TitleApp } from '../TitleApp'
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';
import { TodosError } from "../loadingSkeleton/TodosError";
import { TodosLoading } from "../loadingSkeleton/TodosLoading";
import { EmptyTodos } from "../loadingSkeleton/EmptyTodos";
import { DeleteCompletedButton } from "../DeleteCompletedButton";
import { EditTodo } from "../EditTodo";
import { Login } from "../Login";
import { SignUp } from "../SignUp";
import { User } from "../User";
import { useApiUsers } from '../hooks/useApiUsers';
import { useApiTodos } from '../hooks/useApiTodos';
import './App.css';

function App() {
  
  const { 
    openModalLogin,
    setOpenModalLogin,
    isLoged,
    saveIsLoged,
    token,
    saveToken,
    openModalSignUp,
    setOpenModalSignUp,
    loadingApiUsers,
    errorApiUsers,
    username,
    setUsername,
    setLoadingApiUsers,
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
    saveTodos,
    completedTodosArr,
    todoId,
    setTodoId,
    todoCompleted,
    setTodoCompleted,
    isDemo,
    toggleDemo,
  } = useApiUsers();
  const {
    callApi,
    errorApiTodos,
  } = useApiTodos(token);
  return (
    <React.Fragment>
      <User
        loading={(loading || loadingApiUsers)}
        username={username}
        logout={() => {
          saveIsLoged(false);
          saveToken('');
          setUsername('');
          saveTodos([]);
          setLoadingApiUsers(true);
          setOpenModalLogin(true);
        }}
        isLoged={isLoged}
      />

      <TitleApp loading={(loading || loadingApiUsers)}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />

        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TitleApp>

      {(!!openModalLogin && !isLoged && !loading) && (
        <Modal>
          <Login
            setOpenModalLogin={setOpenModalLogin}
            saveIsLoged={saveIsLoged}
            saveToken={saveToken}
            setOpenModalSignUp={setOpenModalSignUp}
            setLoadingApiUsers={setLoadingApiUsers}
            toggleDemo={toggleDemo}
          />
        </Modal>
      )}

      {(!!openModalSignUp && !isLoged) && (
        <Modal>
          <SignUp
            setOpenModalSignUp={setOpenModalSignUp}
            saveIsLoged={saveIsLoged}
            saveToken={saveToken}
            setOpenModalLogin={setOpenModalLogin}
            toggleDemo={toggleDemo}
          />
        </Modal>
      )}

      <TodoList>
        {(error && errorApiUsers && errorApiTodos) && <TodosError/>}
        {(loading || loadingApiUsers) && 
          new Array(2).fill().map((item, index)=>(
            <TodosLoading key={index} />
          ))
        }
        {(!loading && !loadingApiUsers && !totalTodos) && <EmptyTodos/>}
        {(!loading && !loadingApiUsers && !error && !errorApiUsers && (isLoged || isDemo)) &&
          searchedTodos.map(todo => (
            <TodoItem
              completed={todo.completed}
              key={todo.text}
              id={todo.id}
              setTodoId={setTodoId}
              setTodoCompleted={setTodoCompleted}
              text={todo.text}
              setTodoValue={setTodoValue}
              setOpenModalEdit={setOpenModalEdit}
              onComplete={() => {
                toggleCompleteTodo(todo.text);
                if (!isDemo) {
                  callApi('todos', 'PUT', { ...todo, completed: todo.completed });
                }
              }}
              onDelete={() => {
                deleteTodo(todo.text); 
                if (!isDemo) {
                  callApi(`todos/${todo.id}`, 'DELETE');
                }
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
            isDemo={isDemo}
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
            isDemo={isDemo}
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
          if (!isDemo) {
            callApi('todos/list', 'DELETE', completedTodosArr);
          }
        }}
      />

    </React.Fragment>
  );
}

export default App;
