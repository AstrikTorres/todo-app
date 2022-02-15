import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <App saludo="Hello World whit props in React">
    <div>
      This is a children
    </div>
  </App>,
  document.getElementById('root')
);
