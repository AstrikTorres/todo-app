import React, { useCallback } from 'react';
import { useLocalStorage } from "./useLocalStorage";
import { useTodos } from "./useTodos";

function useApiUsers() {
  const { item: token, saveItem: saveToken} = useLocalStorage('token', "");
  const { item: isLoged, saveItem: saveIsLoged } = useLocalStorage('isLoged', false);
  const [loadingApiUsers, setLoadingApiUsers] = React.useState(true);
  const [errorApiUsers, setErrorApiUsers] = React.useState(false);
  const [username, setUsername] = React.useState("");
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
    todos,
    saveTodos,
    completedTodosArr,
    todoId,
    setTodoId,
    todoCompleted,
    setTodoCompleted,
  } = useTodos();

  const URL_API = 'http://localhost:8080/api/';
  
  const getAuth = useCallback(async () => {
    const response = await fetch(`${URL_API}users/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const status = response.status;
    const data = await response.json();
    if (status === 200) {
      setUsername(data.username);
      saveIsLoged(true);
      setLoadingApiUsers(true);
    } else {
      saveIsLoged(false);
      saveToken("");
      saveTodos([])
      setLoadingApiUsers(false);
    }
  });

  React.useEffect(() => {
    if (token && loadingApiUsers === true) {
      getAuth();
    }
  }, [token]);

  const getTodos = useCallback(async () => {
    const data = await fetch(`${URL_API}todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const json = await data.json();
    setLoadingApiUsers(false);
    if (JSON.stringify(json).startsWith("[")) {
      saveTodos(json);
    }
  });

  React.useEffect(() => {
    if (loadingApiUsers && isLoged) {
      getTodos().catch(error => {
        setErrorApiUsers(error);
      });
    }
  }, [isLoged]);

  const [openModalSignUp, setOpenModalSignUp] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(!isLoged);

  return {
    openModalLogin,
    setOpenModalLogin,
    isLoged,
    saveIsLoged,
    token,
    saveToken,
    getAuth,
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
    todos,
    saveTodos,
    completedTodosArr,
    todoId,
    setTodoId,
    todoCompleted,
    setTodoCompleted,
  }

}

export { useApiUsers };