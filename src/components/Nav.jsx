import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
      <Link to="/market/properties">Market</Link>
      <Link to="/search">Search</Link>
      <Link to="/search/map">Map</Link>
      <Link to="/notifications">Notifications</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/wallet/statements">Wallet</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/kyc">KYC</Link>
      <Link to="/company/dashboard">Company</Link>
      <Link to="/contracts">Contracts</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
}

