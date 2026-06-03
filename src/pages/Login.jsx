import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginAPI({ email, password });
      const { token, role } = res.data.data;
      localStorage.setItem('token', token);
      dispatch({ type: 'SET_AUTH', payload: { role, token } });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="login-page" style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', color: '#1a1a2e', marginBottom: 8 }}>Placement Recruitment System</h2>
        <h3 style={{ textAlign: 'center', color: '#555', marginBottom: 20 }}>Login</h3>
        {error && <p data-testid="login-error" style={{ color: 'red', marginBottom: 10 }}>{error}</p>}
        <form data-testid="login-form" onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label>Email</label>
            <input
              data-testid="email-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
              placeholder="admin@test.com"
            />
          </div>
          <div style={fieldStyle}>
            <label>Password</label>
            <input
              data-testid="password-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button data-testid="login-btn" type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

const pageStyle = { minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const cardStyle = { background: '#fff', borderRadius: 8, padding: 40, width: 380, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' };
const fieldStyle = { marginBottom: 16 };
const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', marginTop: 4, boxSizing: 'border-box', fontSize: 14 };
const btnStyle = { width: '100%', padding: '10px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 15, marginTop: 8 };

export default Login;
