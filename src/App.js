import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import Application from './services/TaskService';

function App() {
  return (
    <div>
      <Application/>
    </div>
  );
}

export default App;
