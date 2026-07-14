import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ManageOrders = () => {
  const { triggerAlert } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/all');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching admin orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}`, { orderStatus: status });
      triggerAlert(`Order status updated to "${status}".`);
      fetchOrders();
    } catch (error) {
      triggerAlert('Failed to update order status.', 'error');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: 600 }}>
        ← Back to Dashboard
      </Link>

      <h1 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Manage Orders</h1>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : orders.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '40px' }}>
          No orders received yet.
        </div>
      ) : (
        <div className="glass" style={{ overflowX: 'auto', padding: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px 16px' }}>ORDER ID</th>
                <th style={{ padding: '12px 16px' }}>CUSTOMER</th>
                <th style={{ padding: '12px 16px' }}>TOTAL</th>
                <th style={{ padding: '12px 16px' }}>ORDER STATUS</th>
                <th style={{ padding: '12px 16px' }}>DATE</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>#{o._id.substring(12)}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600 }}>{o.userId?.name || 'Anonymous'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{o.userId?.email}</div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: 700, color: 'var(--primary)' }}>
                    ${o.totalPrice.toFixed(2)}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span className={`badge ${
                      o.orderStatus === 'Delivered' 
                        ? 'badge-success' 
                        : o.orderStatus === 'Cancelled' 
                        ? 'badge-danger' 
                        : 'badge-primary'
                    }`}>
                      {o.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    {o.orderStatus !== 'Cancelled' && o.orderStatus !== 'Delivered' && (
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleUpdateStatus(o._id, 'Shipped')} 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          📦 Ship
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(o._id, 'Delivered')} 
                          className="btn btn-primary" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          ✓ Deliver
                        </button>
                      </div>
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

export default ManageOrders;
