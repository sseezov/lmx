import { UserForm } from './components/UserForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>LMS Admin</h1>
        <p>Тестовая форма для создания пользователя через Phoenix API</p>
      </header>
      <main>
        <UserForm />
      </main>
    </div>
  );
}

export default App;