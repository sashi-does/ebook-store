import React from 'react';

const SearchBar = ({ keyword, setKeyword, handleSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '600px' }}>
      <input
        type="text"
        placeholder="Search books by title, author, or genre..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          flex: 1,
          padding: '14px 20px',
          fontSize: '1rem',
          borderRadius: '12px',
        }}
      />
      <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', borderRadius: '12px' }}>
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
