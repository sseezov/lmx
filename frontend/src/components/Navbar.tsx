import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">LMS</Link>
      </div>
      <div className={styles.links}>
        <Link 
          to="/login" 
          className={location.pathname === '/login' ? styles.active : ''}
        >
          Создать пользователя
        </Link>
        <Link 
          to="/users" 
          className={location.pathname === '/users' ? styles.active : ''}
        >
          Пользователи
        </Link>
      </div>
    </nav>
  );
}