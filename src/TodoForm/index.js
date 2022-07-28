import React from 'react';
import { TodoContext } from "../hooks/useTodos";
import './TodoForm.css';

function TodoForm({ setOpenModal, addTodo, verifyTodoDuplied }) {
  const [newTodoValue, setNewTodoValue] = React.useState('');

  const onOut = () => {
    setOpenModal(prevState => !prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newTodoValue.trim().length) {
      document.getElementById('label').innerHTML = 'Please write something';
    } else if (verifyTodoDuplied(newTodoValue)) {
      document.getElementById('label').innerHTML = 'This todo already exists';
    } else {
      addTodo(newTodoValue);
      onOut();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label id='label'>Write your new TODO</label>
      <textarea
        value={newTodoValue}
        onChange={e => setNewTodoValue(e.target.value)}
        placeholder='Cortar la cebolla'
      />
      <div className='TodoForm-buttonContainer'>
        <button
          type='button'
          className="TodoForm-button TodoForm-button-cancel"
          onClick={onOut}
          style={{
            width: '45%',
            height: '30px',
          }}
        >
          Cancel
        </button>
        <button
          type='submit'
          className="TodoForm-button TodoForm-button-add"
          style={{
            width: '45%',
            height: '30px',
          }}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export { TodoForm };