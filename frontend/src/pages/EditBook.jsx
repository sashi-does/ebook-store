import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EditBook = () => {
  const { id } = useParams();
  const { triggerAlert } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [ISBN, setISBN] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(10);
  const [image, setImage] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`);
        setTitle(data.title);
        setAuthor(data.author);
        setGenre(data.genre);
        setDescription(data.description);
        setISBN(data.ISBN);
        setPrice(data.price);
        setStock(data.stock);
        setImage(data.image);
      } catch (error) {
        triggerAlert('Failed to load book data.', 'error');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`/api/books/${id}`, {
        title,
        author,
        genre,
        description,
        ISBN,
        price: Number(price),
        stock: Number(stock),
        image,
      });
      triggerAlert('Book updated successfully!');
      navigate('/admin');
    } catch (error) {
      triggerAlert(error.response?.data?.message || 'Failed to update book.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
      <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: 600 }}>
        ← Cancel & Back
      </Link>

      <h1 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Edit Book</h1>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Author *</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Genre *</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>ISBN *</label>
            <input type="text" value={ISBN} onChange={(e) => setISBN(e.target.value)} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Price ($) *</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Inventory Stock Level</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Book Cover Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Synopsis / Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={updating}>
          {updating ? 'Saving changes...' : 'Save Book Info'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
