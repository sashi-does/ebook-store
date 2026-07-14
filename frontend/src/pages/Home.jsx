import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/api/books?pageSize=4&sort=rating');
        setFeaturedBooks(data.books);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '0 24px 60px' }}>
      {/* Hero Section */}
      <div className="glass" style={{
        margin: '24px 0 60px',
        padding: '80px 40px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(22, 28, 45, 0.4), rgba(99, 102, 241, 0.05))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          opacity: 0.15,
          zIndex: 0,
        }} />

        <h1 style={{
          fontSize: '3.6rem',
          fontWeight: 800,
          marginBottom: '20px',
          lineHeight: 1.1,
          fontFamily: 'var(--font-display)',
        }}>
          Discover Your Next <span style={{
            background: 'linear-gradient(135deg, var(--primary), #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Literary Adventure</span>
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.25rem',
          maxWidth: '650px',
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          Explore thousands of handpicked titles, bestsellers, and literary masterpieces curated just for you.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/books" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
            Browse Catalog
          </Link>
          <Link to="/register" className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Featured Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', fontWeight: 700 }}>
              Curated Selection
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '4px' }}>Highest Rated Books</h2>
          </div>
          <Link to="/books" style={{ fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All Books <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid var(--border-color)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
