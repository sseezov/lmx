import { useEffect, useState } from 'react';
import styles from './UserTable.module.css';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setUsers(data.data || []);
    } catch (err) {
      setError('Не удалось загрузить пользователей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить пользователя?')) return;

    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert('Ошибка при удалении');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.message}>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2>Пользователи ({users.length})</h2>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Имя</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name || '-'}</td>
              <td>
                <span className={`${styles.badge} ${styles[user.role]}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(user.id)}
                  className={styles.deleteBtn}
                  title="Удалить"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className={styles.message}>Нет пользователей</div>
      )}
    </div>
  );
}