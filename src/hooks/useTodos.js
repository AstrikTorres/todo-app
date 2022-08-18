import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1',[]);

  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [todoValue, setTodoValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const completedTodosArr = todos.filter(todo => !!todo.completed);
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();

      return todoText.includes(searchText);
    })
  }

  const verifyTodoDuplied = (text) => {
    text = text.trim();
    const newTodos = [...todos];
    if (newTodos.find(todo => todo.text === text)) {
      return true;
    }
    return false;
  }

  const toggleCompleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    if (!text.length || verifyTodoDuplied(text)) {
      return;
    } else {
      text = text.trim();
      const newTodos = [...todos];
      newTodos.push({ text, completed: false });
      saveTodos(newTodos);
    }
  };

  const editTodo = (text, newText) => {
    if (!newText.length || verifyTodoDuplied(newText)) {
      return;
    } else {
      text = text.trim();
      const newTodos = [...todos];
      const todoIndex = newTodos.findIndex(todo => todo.text == text);
      newTodos[todoIndex].text = newText;
      saveTodos(newTodos);
    }
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const deleteCompletedTodos = () => {
    const completedTodosArr = todos.filter(todo => !!todo.completed);
    const newTodos = [...todos];
    completedTodosArr.forEach(todo => {
      const todoIndex = newTodos.findIndex(t => t.text === todo.text);
      newTodos.splice(todoIndex, 1);
    });
    saveTodos(newTodos);
    return newTodos;
  }

  return {
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
    completedTodosArr
  };
}

export { useTodos };
