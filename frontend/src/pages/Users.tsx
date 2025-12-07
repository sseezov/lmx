import { UserTable } from '../components/UserTable';
import styles from './Users.module.css';

export function Users() {
  return (
    <div className={styles.container}>
      <h2>Управление пользователями</h2>
      <UserTable />
    </div>
  );
}