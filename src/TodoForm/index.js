import React from 'react';
import './TodoForm.css';

function TodoForm({ setOpenModal, addTodo, verifyTodoDuplied, callApi, result }) {
  const [newTodoValue, setNewTodoValue] = React.useState('');

  const onOut = () => {
    setOpenModal(prevState => !prevState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!newTodoValue.trim().length) {
      document.getElementById('label').innerHTML = 'Please write something';
    } else if (verifyTodoDuplied(newTodoValue)) {
      document.getElementById('label').innerHTML = 'This todo already exists';
    } else {
      const data = await callApi('todos', 'POST', {text: newTodoValue, completed: false});
      addTodo(data);
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