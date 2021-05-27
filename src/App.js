import './App.css';
import TodoList from './components/TodoList/TodoList';
function App() {
  return (
    <div className="App">
      <div className='main'>
        <h1 className='pageTitle'>Todo List</h1>
        <TodoList/>
      </div>
    </div>
  );
}

export default App;
