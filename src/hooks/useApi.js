import React from 'react';

function useApi(token = '', method, endpoint, body = null) {
  const [errorApi, setErrorApi] = React.useState(null);
  const [loadingApi, setLoadingApi] = React.useState(true);
  const [data, setData] = React.useState('data');

  const getData = async () => {
    await fetch(endpoint, {
      method: method,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoadingApi(false);
      }
    )
	};

  React.useEffect(() => {
    try {
      getData();
    }
    catch (error) {
      setErrorApi(error);
      setLoadingApi(false);
    }
  }, []);

  return {
    data,
    loadingApi,
    errorApi
  }
}

export { useApi };