import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { triggerAlert } = useContext(AuthContext);

  const [stats, setStats] = useState(null);
  const [books, setBooks] = useState([]);
  
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/orders/dashboard');
      setStats(data);
    } catch (error) {
      console.error('Error fetching admin dashboard stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('/api/books?pageSize=100'); // Fetch all books
      setBooks(data.books);
    } catch (error) {
      console.error('Error fetching books for dashboard:', error);
    } finally {
      setLoadingBooks(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchBooks();
  }, []);

  const handleDeleteBook = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the book "${title}"?`)) return;
    try {
      await axios.delete(`/api/books/${id}`);
      triggerAlert(`"${title}" deleted successfully.`);
      fetchBooks();
      fetchStats();
    } catch (error) {
      triggerAlert('Failed to delete book.', 'error');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', fontWeight: 700 }}>
            ADMIN PORTAL
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '4px' }}>Dashboard Overview</h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/add-book" className="btn btn-primary">➕ Add New Book</Link>
          <Link to="/admin/orders" className="btn btn-secondary">📦 Manage Orders</Link>
          <Link to="/admin/users" className="btn btn-secondary">👤 Manage Users</Link>
        </div>
      </div>

      {/* Analytics stats */}
      {loadingStats ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ width: '35px', height: '35px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : stats ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          <div className="glass" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL REVENUE</span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '8px', color: '#10B981' }}>${stats.revenue.toFixed(2)}</h2>
          </div>
          <div className="glass" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL ORDERS</span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '8px', color: 'var(--primary)' }}>{stats.totalOrders}</h2>
          </div>
          <div className="glass" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL BOOKS</span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '8px' }}>{stats.totalBooks}</h2>
          </div>
          <div className="glass" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE CUSTOMERS</span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '8px' }}>{stats.totalUsers}</h2>
          </div>
        </div>
      ) : null}

      {/* Book Catalog CRUD Section */}
      <h2 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Book Inventory</h2>
      {loadingBooks ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div className="glass" style={{ overflowX: 'auto', padding: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px 16px' }}>TITLE</th>
                <th style={{ padding: '12px 16px' }}>AUTHOR</th>
                <th style={{ padding: '12px 16px' }}>GENRE</th>
                <th style={{ padding: '12px 16px' }}>PRICE</th>
                <th style={{ padding: '12px 16px' }}>STOCK</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{b.title}</td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{b.author}</td>
                  <td style={{ padding: '16px' }}>
                    <span className="badge badge-primary">{b.genre}</span>
                  </td>
                  <td style={{ padding: '16px', fontWeight: 700 }}>${b.price.toFixed(2)}</td>
                  <td style={{ padding: '16px', color: b.stock <= 5 ? '#EF4444' : 'inherit', fontWeight: b.stock <= 5 ? 700 : 'normal' }}>
                    {b.stock} units
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '12px' }}>
                      <Link to={`/admin/edit-book/${b._id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                        ✏️ Edit
                      </Link>
                      <button 
                        onClick={() => handleDeleteBook(b._id, b.title)} 
                        className="btn btn-accent" 
                        style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
