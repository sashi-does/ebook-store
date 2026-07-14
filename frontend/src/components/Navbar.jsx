import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);
  const { getItemsCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: '16px',
      margin: '16px 24px',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.6rem' }}>📖</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.4rem',
          background: 'linear-gradient(135deg, var(--primary), #818CF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Book Haven</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/books" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-muted)' }}>Browse Books</Link>
        
        {user?.role === 'Admin' && (
          <Link to="/admin" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--primary)' }}>Admin Dashboard</Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '1.1rem' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <Link to="/cart" style={{ position: 'relative', display: 'inline-flex' }} className="btn btn-secondary">
          🛒 Cart
          {getItemsCount() > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'var(--accent)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {getItemsCount()}
            </span>
          )}
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/profile" className="btn btn-secondary">👤 {user.name.split(' ')[0]}</Link>
            <button onClick={handleLogout} className="btn btn-accent" style={{ padding: '10px 18px' }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
