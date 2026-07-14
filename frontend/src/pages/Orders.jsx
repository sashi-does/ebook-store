import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--border-color)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Your Order History</h1>

      {orders.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '60px' }}>
          <span style={{ fontSize: '3rem' }}>📦</span>
          <h3 style={{ marginTop: '16px', marginBottom: '8px' }}>No Orders Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order._id} className="glass" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ORDER ID</span>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>#{order._id}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PLACED ON</span>
                  <p style={{ fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>TOTAL</span>
                  <p style={{ fontWeight: 800, color: 'var(--primary)' }}>${order.totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>STATUS</span>
                  <span className={`badge ${order.orderStatus === 'Delivered' ? 'badge-success' : 'badge-primary'}`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>ITEMS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {order.books.map((b, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span>{b.title} <strong style={{ color: 'var(--primary)' }}>x{b.quantity}</strong></span>
                      <span>${(b.price * b.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
