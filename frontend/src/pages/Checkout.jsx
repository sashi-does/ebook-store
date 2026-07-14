import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { user, triggerAlert } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim()) {
      triggerAlert('Shipping address and contact phone are required.', 'error');
      return;
    }

    setLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      await axios.post('/api/orders', {
        orderItems,
        shippingAddress: address,
        totalPrice: getCartTotal(),
      });

      triggerAlert('Order placed successfully! Check your history.');
      clearCart();
      navigate('/orders');
    } catch (error) {
      triggerAlert(error.response?.data?.message || 'Failed to place order.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="glass" style={{ padding: '28px' }}>
          <h3 style={{ marginBottom: '20px' }}>Shipping Details</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Delivery Address</label>
            <textarea
              placeholder="Provide complete street address, apartment number, state, zip..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="4"
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Contact Phone Number</label>
            <input
              type="text"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : '💳 Place Order'}
          </button>
        </form>

        {/* Checkout Items Summary */}
        <aside className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px', marginBottom: '20px' }}>
            {cartItems.map((item) => (
              <div key={item.bookId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: '180px' }}>
                  {item.title} <strong style={{ color: 'var(--text-main)' }}>x{item.quantity}</strong>
                </span>
                <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
            <span>Grand Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
