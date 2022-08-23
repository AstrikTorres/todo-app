import React, { useCallback } from 'react';
import { useLocalStorage } from "./useLocalStorage";
import { useTodos } from "./useTodos";

function useApiUsers() {
  const { item: token, saveItem: saveToken} = useLocalStorage('token', "");
  const { item: isLoged, saveItem: saveIsLoged } = useLocalStorage('isLoged', false);
  const [loadingApiUsers, setLoadingApiUsers] = React.useState(true);
  const [errorApiUsers, setErrorApiUsers] = React.useState(false);
  const { saveTodos } = useTodos();

  const URL_API = 'http://localhost:8080/api/';
  
  const getAuth = useCallback(async () => {
    await fetch(`${URL_API}users/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(response => response.status)
      .then(status => {
        if (status === 200) {
          saveIsLoged(true);
          setLoadingApiUsers(true);
        } else {
          saveIsLoged(false);
          saveToken("");
          saveTodos([])
          setLoadingApiUsers(false);
        }
      })
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
    errorApiUsers
  }

}

export { useApiUsers };