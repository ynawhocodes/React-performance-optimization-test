import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import React, { useState, useRef, useCallback } from 'react';
const dummyTodos = [
  { id: 0, text: 'todo1', checked: true },
  { id: 1, text: 'todo2', checked: false },
  { id: 2, text: 'todo3', checked: false },
];

function createBultTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({ id: i, text: `todo ${i}`, checked: false });
  }
  return array;
}

function App() {
  const [todos, setTodos] = useState(createBultTodos);
  const nextId = useRef(2501);

  const onInsert = useCallback((newTodoText) => {
    const newTodo = {
      id: nextId.current,
      text: newTodoText,
      checked: false,
    };
    setTodos((todos) => todos.concat(newTodo));
    nextId.current += 1;
  }, []);
  const onRemove = useCallback((id) => {
    const newTodos = (todos) => todos.filter((todos) => id !== todos.id);
    setTodos(newTodos);
  }, []);
  const onToggle = useCallback((id) => {
    const newTodos = (todos) =>
      todos.map((todo) =>
        id === todo.id ? { ...todo, checked: !todo.checked } : todo,
      );
    setTodos(newTodos);
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
