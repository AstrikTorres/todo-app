import React from "react";

function EditTodo({ setOpenModalEdit, todoValue, editTodo, verifyTodoDuplied, callApi, todoId, todoCompleted }) {
  const [newTodoValue, setNewTodoValue] = React.useState('');

  const onOut = () => {
    setOpenModalEdit(prevState => !prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newTodoValue.trim().length) {
      // Print errror message in the id='label'
      document.getElementById('label').innerHTML = 'Please write something';
    } else if (verifyTodoDuplied(newTodoValue)) {
      document.getElementById('label').innerHTML = 'This todo already exists';
    } else {
      editTodo(todoValue, newTodoValue);
      callApi('todos', 'PUT', {
        id: todoId,
        text: newTodoValue,
        completed: todoCompleted
      });
      onOut();
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label id="label">Edit</label>
      <textarea
        defaultValue={todoValue}
        onChange={e => setNewTodoValue(e.target.value)}
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

export { EditTodo };