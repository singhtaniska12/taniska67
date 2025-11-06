import React, { useEffect, useState } from 'react';
import './App.css';

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 12.99, category: 'Accessories' },
  { id: 2, name: 'Mechanical Keyboard', price: 49.99, category: 'Accessories' },
  { id: 3, name: 'HD Monitor', price: 119.99, category: 'Peripherals' },
  { id: 4, name: 'USB-C Hub', price: 29.5, category: 'Accessories' },
  { id: 5, name: 'Laptop Stand', price: 25.0, category: 'Furniture' },
  { id: 6, name: 'Webcam', price: 39.0, category: 'Peripherals' }
];

function App() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);

  // Example: if you want to fetch from an API, useEffect can be used.
  useEffect(() => {
    // fetch('https://api.example.com/products')
    //   .then((r) => r.json())
    //   .then((data) => setProducts(data))
    //   .catch((err) => console.error(err));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Product Catalog</h1>
      </header>

      <div className="search-wrap">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>

      <div className="product-list">
        {filtered.length ? (
          filtered.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-name">{p.name}</div>
              <div className="product-category">{p.category}</div>
              <div className="product-price">${p.price.toFixed(2)}</div>
              <button className="add-btn">Add</button>
            </div>
          ))
        ) : (
          <div className="no-results">No products found.</div>
        )}
      </div>
    </div>
  );
}

export default App;