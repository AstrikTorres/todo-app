import React from 'react';
import { TodoContext } from "../TodoContext";
import './TodoForm.css';

function TodoForm() {
  const [newTodoValue, setNewTodoValue] = React.useState('');

  const { 
    openModal,
    setOpenModal,
    addTodo,
  } = React.useContext(TodoContext);

  const onOut = () => {
    setOpenModal(prevState => !prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodoValue);
    onOut();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Write your new TODO</label>
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