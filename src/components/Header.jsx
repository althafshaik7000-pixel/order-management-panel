import React from 'react';

/**
 * Header Component
 * Displays the main portal banner and description.
 */
export default function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-brand">
          <div className="header-badge">OPS PORTAL</div>
          <h1 className="header-title">ORDER'S PANEL</h1>
          <p className="header-subtitle">Search and manage customer orders</p>
        </div>
      </div>
    </header>
  );
}
