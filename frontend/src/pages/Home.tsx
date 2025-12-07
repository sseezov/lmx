import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.container}>
      <h1>LMS Admin Panel</h1>
      <p>Система управления обучением</p>
      <div className={styles.links}>
        <Link to="/login" className={styles.button}>
          Форма создания пользователя
        </Link>
        <Link to="/users" className={styles.button}>
          Таблица пользователей
        </Link>
      </div>
    </div>
  );
}