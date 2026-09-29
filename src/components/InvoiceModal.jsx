import React, { useEffect } from 'react';

/**
 * InvoiceModal Component
 * Displays a clean, printable invoice with complete financial breakdown.
 */
export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Calculate final total (total + deliveryCharges)
  const deliveryAmt = Number(order.deliveryCharges) || 0;
  const subTotal = Number(order.total) || 0;
  const finalTotal = subTotal + deliveryAmt;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content invoice-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="invoice-title"
      >
        <div className="modal-header no-print">
          <div>
            <h3 id="invoice-title" className="modal-title">
              Order Invoice
            </h3>
            <p className="modal-subtitle">Official tax receipt & summary</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Printable Invoice Area */}
        <div className="invoice-printable" id="printable-invoice">
          <div className="invoice-brand-row">
            <div>
              <h2 className="invoice-heading">INVOICE</h2>
              <div className="invoice-meta-row">
                <span className="meta-label">Invoice Ref:</span>
                <span className="meta-value font-mono">INV-{order.orderId}</span>
              </div>
              <div className="invoice-meta-row">
                <span className="meta-label">Order Date:</span>
                <span className="meta-value">{order.orderDate}</span>
              </div>
            </div>
            <div className="invoice-company-box">
              <span className="company-name">ORDER MANAGEMENT INC.</span>
              <span className="company-text">Internal Fulfillment Portal</span>
              <span className="company-text">Status: {order.status}</span>
            </div>
          </div>

          <div className="invoice-divider"></div>

          {/* Customer & Order Information */}
          <div className="invoice-info-grid">
            <div className="invoice-info-col">
              <h4 className="info-block-title">Customer Details</h4>
              <div className="info-row">
                <span className="info-label">Customer Name:</span>
                <span className="info-value font-bold">{order.buyerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{order.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Mobile:</span>
                <span className="info-value font-mono">{order.mobile}</span>
              </div>
              <div className="info-row">
                <span className="info-label">State:</span>
                <span className="info-value">{order.state}</span>
              </div>
            </div>

            <div className="invoice-info-col">
              <h4 className="info-block-title">Payment & Order Details</h4>
              <div className="info-row">
                <span className="info-label">Order ID:</span>
                <span className="info-value font-mono">#{order.orderId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Payment Method:</span>
                <span className="info-value">{order.paymentMethod}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Order Date:</span>
                <span className="info-value">{order.orderDate}</span>
              </div>
            </div>
          </div>

          {/* Product Items Table */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th className="th-item">Product</th>
                <th className="th-model">Model</th>
                <th className="th-qty">Quantity</th>
                <th className="th-total">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong className="item-name">{order.product}</strong>
                </td>
                <td className="font-mono">{order.model}</td>
                <td className="text-center">{order.quantity}</td>
                <td className="text-right">₹{order.total}</td>
              </tr>
            </tbody>
          </table>

          {/* Pricing Summary */}
          <div className="invoice-summary-box">
            <div className="summary-row">
              <span className="summary-label">Total:</span>
              <span className="summary-val">₹{order.total}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Delivery Charges:</span>
              <span className="summary-val">
                {deliveryAmt === 0 ? '₹0' : `₹${deliveryAmt}`}
              </span>
            </div>
            <div className="summary-row final-total-row">
              <span className="summary-label">Final Total:</span>
              <span className="summary-val font-bold">₹{finalTotal}</span>
            </div>
          </div>

          <div className="invoice-footer-note">
            <p>Thank you for your business. This is a computer-generated invoice.</p>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="modal-footer no-print">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePrint}
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
