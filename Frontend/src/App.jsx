import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('vulnerable');
  const [sql, setSql] = useState('');

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setSql('');
    setUser(null);
    setUsers([]);

    if (!username || !password) {
      setMessage('Please enter username and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8081/api/login?mode=${mode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.sql) setSql(data.sql);

      if (data.users) {
        const normalizedUsers = Array.isArray(data.users)
          ? data.users
          : [data.users];

        setUsers(normalizedUsers);
        setUser(normalizedUsers[0]);
        setMessage(`Logged in as ${normalizedUsers[0].username}`);
      }

      else if (data.user) {
        setUser(data.user);
        setMessage(`Logged in as ${data.users.username}`);
      }

      else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillInjectionPayload = () => {
    setUsername("' OR 1=1 -- ");
    setPassword("anything");
  };

    const fillDropTablePayload = () => {
    setUsername("'; DROP TABLE users; -- ");
    setPassword("anything");
  };

  const fillNormalPayload = () => {
    setUsername('john_doe');
    setPassword('password123');
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    setSql('');
    setUser(null);
    setUsers([]);
  };

  return (
    <div className="login-container">
      <h2>TalkTalk SQL Injection Demo</h2>

      <div className="toggle-mode">
        <label>
          <input
            type="radio"
            checked={mode === 'vulnerable'}
            onChange={() => setMode('vulnerable')}
          />
          Vulnerable Mode
        </label>

        <label>
          <input
            type="radio"
            checked={mode === 'secure'}
            onChange={() => setMode('secure')}
          />
          Secure Mode
        </label>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="buttons">
        <button onClick={fillNormalPayload}>
          Normal Login
        </button>

        <button onClick={fillInjectionPayload}>
          Try SQL Injection
        </button>

        <button onClick={fillDropTablePayload}>
          Drop Table
        </button>

        <button onClick={resetForm}>
          Reset
        </button>
      </div>

      {message && <p className="login-message">{message}</p>}

      {sql && (
        <div className="sql-viewer">
          <h4>Live SQL Query</h4>
          <pre>{sql}</pre>
        </div>
      )}

<br />

      {users.length > 0 && (
        <div className="profile-card">

          {users.map((u, i) => (
            <div key={i} className="user-row">
              <h3>{`Profile Card for ${u.username}`}</h3>
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>Username:</strong> {u.username}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Gender:</strong> {u.gender}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;