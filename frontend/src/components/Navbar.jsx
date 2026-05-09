import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navStyles = {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  };

  const brandStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const linkContainerStyles = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const linkStyles = {
    color: '#666',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const userInfoStyles = {
    color: '#333',
    padding: '8px 16px',
    background: '#f5f5f5',
    borderRadius: '20px',
    fontSize: '14px'
  };

  const logoutBtnStyles = {
    background: '#dc3545',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <nav style={navStyles}>
      <div style={brandStyles}>📋 Task Manager</div>
      <div style={linkContainerStyles}>
        <span onClick={() => navigate('/dashboard')} style={linkStyles}>
          Dashboard
        </span>
        <span onClick={() => navigate('/projects')} style={linkStyles}>
          Projects
        </span>
        <span onClick={() => navigate('/tasks')} style={linkStyles}>
          Tasks
        </span>
        <span style={userInfoStyles}>👋 {user?.name} ({user?.role})</span>
        <button onClick={handleLogout} style={logoutBtnStyles}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
