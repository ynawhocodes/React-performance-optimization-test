import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
function App() {
  const dummyTodos = [
    { id: 1, text: 'todo1', checked: true },
    { id: 2, text: 'todo2', checked: false },
    { id: 3, text: 'todo3', checked: false },
  ];
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={dummyTodos} />
    </TodoTemplate>
  );
}

export default App;
