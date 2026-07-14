import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ animation: 'fadeIn 0.5s ease', padding: '80px 24px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <span style={{ fontSize: '4rem' }}>🛒</span>
        <h2 style={{ marginTop: '24px', marginBottom: '12px' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>It looks like you haven't added any books to your cart yet.</p>
        <Link to="/books" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Your Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>
        {/* Cart items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.map((item) => (
            <div key={item.bookId} className="glass" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <img src={item.image} alt={item.title} style={{ width: '80px', height: '110px', objectFit: 'cover', borderRadius: '8px' }} />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
                  <Link to={`/books/${item.bookId}`}>{item.title}</Link>
                </h4>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', display: 'block', marginBottom: '12px' }}>
                  ${item.price.toFixed(2)}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', minWidth: '30px' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 700, width: '24px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', minWidth: '30px' }}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.bookId)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            <span>Shipping</span>
            <span style={{ color: '#10B981', fontWeight: 600 }}>FREE</span>
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800 }}>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px' }}
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
