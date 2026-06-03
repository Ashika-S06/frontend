import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav data-testid="navbar" style={{ background: '#1a1a2e', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <Link to="/dashboard"    data-testid="dashboard-link"    style={linkStyle}>Dashboard</Link>
      <Link to="/students"     data-testid="students-link"     style={linkStyle}>Students</Link>
      <Link to="/companies"    data-testid="companies-link"    style={linkStyle}>Companies</Link>
      <Link to="/drives"       data-testid="drives-link"       style={linkStyle}>Drives</Link>
      <Link to="/applications" data-testid="applications-link" style={linkStyle}>Applications</Link>
      <Link to="/interviews"   data-testid="interviews-link"   style={linkStyle}>Interviews</Link>
      <Link to="/analytics"    data-testid="analytics-link"    style={linkStyle}>Analytics</Link>
      <span style={{ marginLeft: 'auto', color: '#aaa', fontSize: 13 }}>{state.authUser}</span>
      <Link to="/profile" data-testid="profile-link" style={{ ...linkStyle, fontSize: 13 }}>Profile</Link>
      <button onClick={logout} data-testid="logout-btn"
        style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 4, cursor: 'pointer' }}>
        Logout
      </button>
    </nav>
  );
};

const linkStyle = { color: '#e0e0e0', textDecoration: 'none', fontWeight: 500 };
export default Navbar;
