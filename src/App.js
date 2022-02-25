import React from 'react'
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { CreateTodoButton } from './CreateTodoButton';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList'
import { TittleApp } from './TittleApp'
// import './App.css';

const todos = [
  { text: "Cortar cebolla", completed: false },
  { text: "Tomar curso de React", completed: false },
  { text: "Llorar con la llorona", completed: true },
]

function App() {
  return (
    <React.Fragment>
      <TittleApp/>

      <TodoCounter />

      <TodoSearch />

      <TodoList>
          {todos.map(todo => (
            <TodoItem completed={todo.completed} key={todo.text} text={ todo.text}/>
          ))}
      </TodoList>

      <CreateTodoButton/>

    </React.Fragment>
  );
}

export default App;
