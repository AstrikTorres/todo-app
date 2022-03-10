import React from "react";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoItem } from '../TodoItem';
import { TodoList } from '../TodoList'
import { TittleApp } from '../TittleApp'

function AppUI({
  loading,
  error,
  totalTodos,
  completedTodos,
  searchValue,
  setSearchValue,
  searchedTodos,
  toggleCompleteTodo,
  deleteTodo,
}) {
  return (
    <React.Fragment>
      <TittleApp/>

      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />

      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {error && <p className="msg">Failed to load</p>}
        {loading && <p className="msg">Loading...</p>}
        {(!loading && !searchedTodos.length) && <p className="msg">Create a TODO!</p>}
        {(!loading && !error) &&
          searchedTodos.map(todo => (
            <TodoItem
              completed={todo.completed}
              key={todo.text}
              text={todo.text}
              onComplete={() => toggleCompleteTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))
        }
      </TodoList>

      <CreateTodoButton/>

    </React.Fragment>
  );
}

export { AppUI };