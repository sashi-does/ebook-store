import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ManageUsers = () => {
  const { triggerAlert } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/orders/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete user "${name}"?`)) return;
    try {
      await axios.delete(`/api/orders/users/${id}`);
      triggerAlert(`User "${name}" successfully deleted.`);
      fetchUsers();
    } catch (error) {
      triggerAlert(error.response?.data?.message || 'Failed to delete user.', 'error');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: 600 }}>
        ← Back to Dashboard
      </Link>

      <h1 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Manage Users</h1>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div className="glass" style={{ overflowX: 'auto', padding: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px 16px' }}>NAME</th>
                <th style={{ padding: '12px 16px' }}>EMAIL</th>
                <th style={{ padding: '12px 16px' }}>ROLE</th>
                <th style={{ padding: '12px 16px' }}>REGISTERED</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: '16px' }}>{u.email}</td>
                  <td style={{ padding: '16px' }}>
                    <span className={`badge ${u.role === 'Admin' ? 'badge-primary' : 'badge-success'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    {u.role !== 'Admin' && (
                      <button 
                        onClick={() => handleDeleteUser(u._id, u.name)} 
                        className="btn btn-accent" 
                        style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                      >
                        Delete User
                      </button>
                    )}
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

export default ManageUsers;
