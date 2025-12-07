import { UserForm } from '../components/UserForm';
import styles from './Login.module.css';

export function Login() {
  return (
    <div className={styles.container}>
      <h2>Создание пользователя</h2>
      <UserForm />
    </div>
  );
}