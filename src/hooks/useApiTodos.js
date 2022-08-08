import React from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useTodos } from './useTodos';

function useApiTodos(endpoint, method, body = {}) {
  const { item: token, saveItem: saveToken} = useLocalStorage('token', "");

  const URL_API = 'http://localhost:8080/api/';

  const [errorApi, setErrorApi] = React.useState(null);
  const [loadingApi, setLoadingApi] = React.useState(true);
  const [result, setResult] = React.useState('');

  const apiCall = async () => {
    await fetch(`${URL_API}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setLoadingApi(false);
      }
    )
  };
  
  React.useEffect(() => {
    apiCall();
  }, [token]);

  return {
    result,
    loadingApi,
    errorApi,
  }
}

export { useApiTodos };