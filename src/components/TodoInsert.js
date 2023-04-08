import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [todoText, setTodoText] = useState('');
  const onChange = useCallback((e) => {
    setTodoText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(todoText);
      setTodoText('');
      e.preventDefault();
    },
    [onInsert, todoText],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="Write your DUMMY TODO"
        value={todoText}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
