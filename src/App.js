import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import React, { useState, useRef, useCallback } from 'react';
const dummyTodos = [
  { id: 0, text: 'todo1', checked: true },
  { id: 1, text: 'todo2', checked: false },
  { id: 2, text: 'todo3', checked: false },
];
function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const nextId = useRef(3);

  const onInsert = useCallback(
    (newTodoText) => {
      const newTodo = {
        id: nextId.current,
        text: newTodoText,
        checked: false,
      };
      setTodos(todos.concat(newTodo));
      nextId.current += 1;
    },
    [todos],
  );
  console.log(todos);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
}

export default App;
