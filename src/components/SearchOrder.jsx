import React from 'react';

/**
 * SearchOrder Component
 * Provides search criteria selection (Order ID, Mobile, Name, Email),
 * value input, and the SEARCH ORDER action button.
 */
export default function SearchOrder({
  searchBy,
  setSearchBy,
  searchValue,
  setSearchValue,
  onSearch,
  onReset
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <section className="search-section card">
      <div className="section-header">
        <h2 className="section-title">SEARCH ORDER</h2>
        <span className="section-caption">Locate orders by specific customer or tracking details</span>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="searchBySelect" className="form-label">
            Search By
          </label>
          <select
            id="searchBySelect"
            className="form-select"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="Order ID">Order ID</option>
            <option value="Mobile">Mobile</option>
            <option value="Name">Name</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div className="form-group flex-grow">
          <label htmlFor="searchValueInput" className="form-label">
            Enter Search Value
          </label>
          <input
            id="searchValueInput"
            type="text"
            className="form-input"
            placeholder={`Enter ${searchBy}...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary search-btn">
            SEARCH ORDER
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onReset}
            title="Reset search and show all orders"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Quick Test Values Helper for Technical Assessment */}
      <div className="quick-test-bar">
        <span className="quick-test-label">Quick Test Values:</span>
        <button
          type="button"
          className="quick-chip"
          onClick={() => {
            setSearchBy('Order ID');
            setSearchValue('ORD1001');
          }}
        >
          Order ID: <strong>ORD1001</strong>
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => {
            setSearchBy('Mobile');
            setSearchValue('9876543210');
          }}
        >
          Mobile: <strong>9876543210</strong>
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => {
            setSearchBy('Name');
            setSearchValue('Dummy');
          }}
        >
          Name: <strong>Dummy</strong>
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => {
            setSearchBy('Email');
            setSearchValue('dummy@gmail.com');
          }}
        >
          Email: <strong>dummy@gmail.com</strong>
        </button>
      </div>
    </section>
  );
}
