import { useState, type FormEvent, type ChangeEvent } from 'react';
import styles from './UserForm.module.css';

interface UserFormData {
  email: string;
  name: string;
  role: string;
}

export function UserForm() {
  const [form, setForm] = useState<UserFormData>({
    email: '',
    name: '',
    role: 'student'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: form })
      });

      if (response.ok) {
        setMessage('Пользователь создан');
        setForm({ email: '', name: '', role: 'student' });
      } else {
        const error = await response.json();
        setMessage(`Ошибка: ${JSON.stringify(error.errors)}`);
      }
    } catch (err) {
      console.log(err);
      setMessage('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2>Создать пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Имя</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Роль</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Студент</option>
            <option value="teacher">Преподаватель</option>
            <option value="admin">Администратор</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Создать'}
        </button>
      </form>

      {message && (
        <div className={message.includes('Ошибка') ? styles.error : styles.success}>
          {message}
        </div>
      )}
    </div>
  );
}