import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = (props) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">DUMMY TODO</div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default TodoTemplate;
