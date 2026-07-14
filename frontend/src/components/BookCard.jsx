import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="glass" style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
    }}>
      <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={book.image} 
          alt={book.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#FCD34D',
        }}>
          ★ {book.rating > 0 ? book.rating.toFixed(1) : 'New'}
        </div>
      </div>

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', fontWeight: 700 }}>
            {book.genre}
          </span>
          <h3 style={{ fontSize: '1.1rem', marginTop: '6px', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.4rem' }}>
            <Link to={`/books/${book._id}`}>{book.title}</Link>
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>by {book.author}</p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>${book.price.toFixed(2)}</span>
            <span style={{ fontSize: '0.8rem', color: book.stock > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
              {book.stock > 0 ? `${book.stock} In Stock` : 'Out of Stock'}
            </span>
          </div>

          <button 
            onClick={() => addToCart(book)}
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={book.stock <= 0}
          >
            {book.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
