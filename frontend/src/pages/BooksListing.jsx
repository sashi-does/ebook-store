import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

const BooksListing = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Query States
  const [keyword, setKeyword] = useState('');
  const [genre, setGenre] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');
  const [sort, setSort] = useState('newest');
  
  // Available Genres filter options
  const [genresList, setGenresList] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        keyword,
        genre,
        minPrice,
        maxPrice,
        rating,
        sort,
        page,
      });

      const { data } = await axios.get(`/api/books?${queryParams.toString()}`);
      setBooks(data.books);
      setPages(data.pages);
      if (data.genres) {
        setGenresList(data.genres);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [genre, rating, sort, page]);

  const handleSearch = () => {
    setPage(1);
    fetchBooks();
  };

  const clearFilters = () => {
    setKeyword('');
    setGenre('');
    setMinPrice('');
    setMaxPrice('');
    setRating('');
    setSort('newest');
    setPage(1);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center' }}>Explore Our Catalog</h1>
        <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
        {/* Filters Sidebar */}
        <aside className="glass" style={{ padding: '24px', height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Filters</h3>
            <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              Clear All
            </button>
          </div>

          {/* Genre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Genre</label>
            <select value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1); }}>
              <option value="">All Genres</option>
              {genresList.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Price Range ($)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <button onClick={handleSearch} className="btn btn-secondary" style={{ width: '100%', marginTop: '8px', padding: '8px' }}>Apply Price</button>
          </div>

          {/* Minimum Rating */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Minimum Rating</label>
            <select value={rating} onChange={(e) => { setRating(e.target.value); setPage(1); }}>
              <option value="">Any Rating</option>
              <option value="4.5">★ 4.5 & up</option>
              <option value="4.0">★ 4.0 & up</option>
              <option value="3.0">★ 3.0 & up</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sort By</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest Releases</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>

        {/* Catalog Grid */}
        <main>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <div style={{
                width: '45px',
                height: '45px',
                border: '4px solid var(--border-color)',
                borderTopColor: 'var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
            </div>
          ) : books.length === 0 ? (
            <div className="glass" style={{ textAlign: 'center', padding: '80px 40px' }}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h2 style={{ marginTop: '16px', marginBottom: '8px' }}>No Books Found</h2>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search keywords.</p>
            </div>
          ) : (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '24px',
                marginBottom: '40px',
              }}>
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {/* Pagination Controls */}
              {pages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 16px' }}
                  >
                    Previous
                  </button>
                  {[...Array(pages).keys()].map((pNum) => (
                    <button
                      key={pNum + 1}
                      onClick={() => setPage(pNum + 1)}
                      className={`btn ${page === pNum + 1 ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '8px 16px' }}
                    >
                      {pNum + 1}
                    </button>
                  ))}
                  <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 16px' }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BooksListing;
