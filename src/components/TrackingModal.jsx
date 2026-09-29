import React, { useEffect } from 'react';

/**
 * TrackingModal Component
 * Displays order tracking timeline and highlights the current order status.
 */
export default function TrackingModal({ order, onClose }) {
  if (!order) return null;

  const steps = [
    'Order Placed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  // Determine which step is currently active
  const currentStepIndex = steps.findIndex(
    (step) => step.toLowerCase() === order.status?.toLowerCase()
  );

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content tracking-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracking-title"
      >
        <div className="modal-header">
          <div>
            <h3 id="tracking-title" className="modal-title">
              Track Order
            </h3>
            <p className="modal-subtitle">Real-time status updates</p>
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

        <div className="modal-body">
          {/* Order Details Header */}
          <div className="tracking-info-box">
            <div className="tracking-info-item">
              <span className="tracking-info-label">Order ID:</span>
              <span className="tracking-info-value font-mono">#{order.orderId}</span>
            </div>
            <div className="tracking-info-item">
              <span className="tracking-info-label">Current Status:</span>
              <span className="status-highlight">{order.status}</span>
            </div>
          </div>

          {/* Vertical Tracking Timeline */}
          <div className="timeline-container">
            {steps.map((step, index) => {
              const isCompleted = currentStepIndex !== -1 && index < currentStepIndex;
              const isCurrent = currentStepIndex !== -1 && index === currentStepIndex;
              const isPending = currentStepIndex === -1 || index > currentStepIndex;

              return (
                <div
                  key={step}
                  className={`timeline-step ${
                    isCurrent
                      ? 'step-current'
                      : isCompleted
                      ? 'step-completed'
                      : 'step-pending'
                  }`}
                >
                  <div className="timeline-indicator-col">
                    <div className="timeline-dot">
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="timeline-line"></div>
                    )}
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-step-name">
                      {step}
                      {isCurrent && (
                        <span className="current-badge">Current Status</span>
                      )}
                    </div>
                    <div className="timeline-step-desc">
                      {isCurrent
                        ? `Order is currently at ${step} stage.`
                        : isCompleted
                        ? `Completed on schedule.`
                        : `Pending next update.`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
