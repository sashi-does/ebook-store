import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const BookDetails = () => {
  const { id } = useParams();
  const { user, triggerAlert } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Review states
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  const fetchBookDetails = async () => {
    try {
      const bookRes = await axios.get(`/api/books/${id}`);
      setBook(bookRes.data);

      const reviewsRes = await axios.get(`/api/reviews/${id}`);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) {
      triggerAlert('Review text is required', 'error');
      return;
    }
    try {
      await axios.post('/api/reviews', {
        bookId: book._id,
        rating: Number(newRating),
        review: newReviewText,
      });
      triggerAlert('Review added successfully!');
      setNewReviewText('');
      setNewRating(5);
      fetchBookDetails(); // Refresh book rating and list
    } catch (error) {
      triggerAlert(error.response?.data?.message || 'Failed to submit review', 'error');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      triggerAlert('Review deleted.');
      fetchBookDetails();
    } catch (error) {
      triggerAlert('Failed to delete review.', 'error');
    }
  };

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

  if (!book) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2>Book not found</h2>
        <Link to="/books" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to catalog</Link>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <Link to="/books" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: 600 }}>
        ← Back to Catalog
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '48px', marginBottom: '60px' }}>
        {/* Book Cover */}
        <div className="glass" style={{ overflow: 'hidden', height: 'fit-content' }}>
          <img src={book.image} alt={book.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* Book Metadata */}
        <div>
          <span className="badge badge-primary">{book.genre}</span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '12px', marginBottom: '8px', lineHeight: 1.1 }}>{book.title}</h1>
          <h3 style={{ fontWeight: 500, color: 'var(--text-muted)', marginBottom: '20px' }}>by {book.author}</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '1.2rem', color: '#FCD34D', fontWeight: 700 }}>
              ★ {book.rating > 0 ? book.rating.toFixed(1) : 'No Ratings'}
            </span>
            <span style={{ color: 'var(--border-focus)' }}>|</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ISBN: {book.ISBN}</span>
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px', color: 'var(--text-muted)' }}>
            {book.description}
          </p>

          <div className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>PRICE</span>
              <span style={{ fontSize: '2rem', fontWeight: 800 }}>${book.price.toFixed(2)}</span>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>INVENTORY</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: book.stock > 0 ? '#10B981' : '#EF4444' }}>
                {book.stock > 0 ? `${book.stock} Available` : 'Out of Stock'}
              </span>
            </div>

            {book.stock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Qty:</span>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ width: '70px', padding: '8px' }}
                >
                  {[...Array(book.stock).keys()].slice(0, 10).map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>

                <button 
                  onClick={() => addToCart(book, quantity)}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Customer Reviews</h2>

        {/* Add Review */}
        {user ? (
          <form onSubmit={handleAddReview} className="glass" style={{ padding: '24px', marginBottom: '32px' }}>
            <h4 style={{ marginBottom: '16px' }}>Write a Review</h4>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Rating:</span>
              <select value={newRating} onChange={(e) => setNewRating(e.target.value)} style={{ width: '100px', padding: '8px' }}>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <textarea
                placeholder="Share your thoughts about this book..."
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        ) : (
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            Please <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>login</Link> to write a review.
          </p>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviews.map((r) => (
              <div key={r._id} className="glass" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h5 style={{ fontSize: '1.05rem', marginBottom: '2px' }}>{r.userId?.name || 'Anonymous User'}</h5>
                    <span style={{ color: '#FCD34D', fontSize: '0.9rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{r.review}</p>
                {(user?._id === r.userId?._id || user?.role === 'Admin') && (
                  <button 
                    onClick={() => handleDeleteReview(r._id)} 
                    style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.8rem', marginTop: '10px', fontWeight: 600 }}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
