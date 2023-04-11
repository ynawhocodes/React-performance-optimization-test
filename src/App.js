import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import React, { useRef, useCallback, useReducer } from 'react';

function createBultTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({ id: i, text: `todo ${i}`, checked: false });
  }
  return array;
}
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBultTodos);
  const nextId = useRef(2501);

  const onInsert = useCallback((newTodoText) => {
    const newTodo = {
      id: nextId.current,
      text: newTodoText,
      checked: false,
    };
    dispatch({ type: 'INSERT', newTodo });
    nextId.current += 1;
  }, []);
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);
  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
