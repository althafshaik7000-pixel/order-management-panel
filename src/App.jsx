import React, { useState } from 'react';
import Header from './components/Header.jsx';
import SearchOrder from './components/SearchOrder.jsx';
import OrderCard from './components/OrderCard.jsx';
import TrackingModal from './components/TrackingModal.jsx';
import InvoiceModal from './components/InvoiceModal.jsx';
import ordersData from './data/orders.json';
import './App.css';

/**
 * App Component
 * Root component managing search criteria, filter execution, and active modals.
 */
export default function App() {
  const [searchBy, setSearchBy] = useState('Order ID');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(ordersData);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  /**
   * Execute order search based on selected criteria and trimmed input
   */
  const handleSearch = () => {
    const trimmedInput = searchValue.trim();

    // Validation: empty input check
    if (!trimmedInput) {
      setErrorMessage('Please enter a search value.');
      setSearchResults([]);
      setHasSearched(true);
      return;
    }

    const lowerQuery = trimmedInput.toLowerCase();

    // Filter orders based on the dropdown search criterion
    const filtered = ordersData.filter((order) => {
      switch (searchBy) {
        case 'Order ID':
          // Match Order ID (case-insensitive substring or exact)
          return order.orderId.toLowerCase().includes(lowerQuery);

        case 'Mobile':
          // Match Mobile number string
          return order.mobile.includes(trimmedInput);

        case 'Name':
          // Case-insensitive match for Name (supports matching "Dummy" across multiple orders)
          return order.buyerName.toLowerCase().includes(lowerQuery);

        case 'Email':
          // Case-insensitive match for Email
          return order.email.toLowerCase().includes(lowerQuery);

        default:
          return false;
      }
    });

    setHasSearched(true);

    if (filtered.length === 0) {
      setErrorMessage('No order found.');
      setSearchResults([]);
    } else {
      setErrorMessage('');
      setSearchResults(filtered);
    }
  };

  /**
   * Reset search and show all sample orders
   */
  const handleReset = () => {
    setSearchBy('Order ID');
    setSearchValue('');
    setErrorMessage('');
    setHasSearched(false);
    setSearchResults(ordersData);
  };

  return (
    <div className="app-container">
      {/* Dark Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="container">
          {/* SEARCH ORDER Section */}
          <SearchOrder
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={handleSearch}
            onReset={handleReset}
          />

          {/* Search Result / Status Banner */}
          <section className="results-section">
            {errorMessage ? (
              <div
                className={`alert-message ${
                  errorMessage === 'Please enter a search value.'
                    ? 'alert-warning'
                    : 'alert-danger'
                }`}
                role="alert"
              >
                <div className="alert-content">
                  <span className="alert-icon">
                    {errorMessage === 'Please enter a search value.' ? '⚠️' : '🔍'}
                  </span>
                  <p className="alert-text">{errorMessage}</p>
                </div>
              </div>
            ) : null}

            {/* Results Header Info */}
            {!errorMessage && (
              <div className="results-header-bar">
                <h3 className="results-title">
                  {hasSearched ? 'Search Results' : 'Customer Orders'}
                </h3>
                <span className="results-count-badge">
                  {searchResults.length} {searchResults.length === 1 ? 'Order' : 'Orders'} Found
                </span>
              </div>
            )}

            {/* Matching Orders Grid */}
            {!errorMessage && searchResults.length > 0 && (
              <div className="orders-grid">
                {searchResults.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    onTrack={(ord) => setSelectedTrackingOrder(ord)}
                    onInvoice={(ord) => setSelectedInvoiceOrder(ord)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Track Order Modal */}
      {selectedTrackingOrder && (
        <TrackingModal
          order={selectedTrackingOrder}
          onClose={() => setSelectedTrackingOrder(null)}
        />
      )}

      {/* Generate Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

      {/* Footer */}
      <footer className="footer-bar no-print">
        <p>Order Search Panel &bull; Technical Assessment Application &bull; Port 3000</p>
      </footer>
    </div>
  );
}
