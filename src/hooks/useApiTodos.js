import React from 'react';

function useApiTodos(token) {
  const URL_API = 'http://localhost:8080/api/';

  const [errorApi, setErrorApi] = React.useState(null);
  const [loadingApi, setLoadingApi] = React.useState(true);
  const [result, setResult] = React.useState('');

  const callApi = async (endpoint, method, body = {}) => {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
    if (body !== {}) {
      options.body = JSON.stringify(body);
    }  
    const data = await fetch(`${URL_API}${endpoint}`, options)
      .catch(e => setErrorApi(e));
    const json = await data.json();
    setResult(json);
    setLoadingApi(false); 
  }

  return {
    result,
    loadingApi,
    errorApi,
    callApi
  }
}

export { useApiTodos };