import React from 'react';

/**
 * OrderCard Component
 * Displays complete order details and action buttons (Track Order, Generate Invoice).
 */
export default function OrderCard({ order, onTrack, onInvoice }) {
  // Helper to get status badge CSS class
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'badge-success';
      case 'out for delivery':
        return 'badge-warning';
      case 'shipped':
        return 'badge-info';
      case 'processing':
        return 'badge-primary';
      case 'order placed':
        return 'badge-neutral';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <article className="order-card card">
      <div className="order-card-header">
        <div className="order-title-group">
          <span className="order-label">Order</span>
          <h3 className="order-id">#{order.orderId}</h3>
        </div>
        <div className="order-header-right">
          <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="order-details-grid">
        <div className="detail-item">
          <span className="detail-label">Order Date:</span>
          <span className="detail-value">{order.orderDate}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Order ID:</span>
          <span className="detail-value font-mono">{order.orderId}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Payment Method:</span>
          <span className="detail-value">{order.paymentMethod}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Buyer Name:</span>
          <span className="detail-value font-bold">{order.buyerName}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">State:</span>
          <span className="detail-value">{order.state}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{order.email}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Mobile:</span>
          <span className="detail-value font-mono">{order.mobile}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Product:</span>
          <span className="detail-value font-medium">{order.product}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Model:</span>
          <span className="detail-value">{order.model}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Quantity:</span>
          <span className="detail-value">{order.quantity}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Delivery Charges:</span>
          <span className="detail-value">
            {order.deliveryCharges === 0 ? '₹0' : `₹${order.deliveryCharges}`}
          </span>
        </div>

        <div className="detail-item highlight-total">
          <span className="detail-label">Total:</span>
          <span className="detail-value total-price">₹{order.total}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className="detail-value font-medium">{order.status}</span>
        </div>
      </div>

      <div className="order-card-actions">
        <button
          type="button"
          className="btn btn-secondary action-btn"
          onClick={() => onTrack(order)}
        >
          Track Order
        </button>
        <button
          type="button"
          className="btn btn-primary action-btn"
          onClick={() => onInvoice(order)}
        >
          Generate Invoice
        </button>
      </div>
    </article>
  );
}
