import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>
      <nav style={{display: 'flex', gap: '1rem'}}>
        <div className="header">
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" style={{width: '100px'}} /> 
        </div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/product">Product</Link>
      </nav>
    </header>
  );
}