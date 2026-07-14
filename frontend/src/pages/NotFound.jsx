import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '80px 24px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <span style={{ fontSize: '5rem' }}>🧭</span>
      <h1 style={{ fontSize: '3rem', marginTop: '24px', marginBottom: '12px' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
};

export default NotFound;
