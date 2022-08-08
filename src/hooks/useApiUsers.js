import React, { useCallback } from 'react';
import { useLocalStorage } from "./useLocalStorage";
import { useTodos } from "./useTodos";

function useApiUsers() {
  const { item: token, saveItem: saveToken} = useLocalStorage('token', "");
  const { item: isLoged, saveItem: setIsLoged } = useLocalStorage('isLoged', false);
  const [loadingApi, setLoadingApi] = React.useState(true);
  const [errorApi, setErrorApi] = React.useState(false);
  const { todos, saveTodos } = useTodos();

  const [result, setResult] = React.useState('');

  const URL_API = 'http://localhost:8080/api/';
  
  const getAuth = async () => {
    await fetch(`${URL_API}users/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(response => response.status)
      .then(status => {
        if (status === 200) {
          setIsLoged(true);
          setLoadingApi(true);
        } else {
          setIsLoged(false);
          setLoadingApi(false);
        }
      })
  }

  React.useEffect(() => {
    if (token && !isLoged) {
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
    setResult(json);
    setLoadingApi(false);
    saveTodos(json);
  });

  React.useEffect(() => {
    if (loadingApi && isLoged) {
      getTodos().catch(error => {
        setErrorApi(error);
      });
    }
  }, [isLoged]);

  // React.useEffect(async () => {
  //   console.log(result);
  // }, [result]);

  const [openModalLogin, setOpenModalLogin] = React.useState(!isLoged);

  return {
    openModalLogin,
    setOpenModalLogin,
    isLoged,
    setIsLoged,
    token,
    saveToken,
    getAuth
  }

}

export { useApiUsers };