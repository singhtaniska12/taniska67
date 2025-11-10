import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Search from './Search';

export default function Home() {
  // Demo list of products with images
  const products = [
    { id: 1, name: 'Sample Product 1', image: 'https://via.placeholder.com/200x150?text=Product+1', price: '₹499', type: 'accessory' },
    { id: 2, name: 'Sample Product 2', image: 'https://via.placeholder.com/200x150?text=Product+2', price: '₹799', type: 'accessory' },
    { id: 3, name: 'Wireless Headphones', image: 'https://via.placeholder.com/200x150?text=Headphones', price: '₹1,299', type: 'electronics' },
    { id: 4, name: 'Smart Watch', image: 'https://via.placeholder.com/200x150?text=Watch', price: '₹2,499', type: 'wearable' },
  ];

  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      const matchName = !q || p.name.toLowerCase().includes(q);
      const matchType = type === 'all' || p.type === type;
      return matchName && matchType;
    });
  }, [query, type]);

  return (
    <main style={{padding: '1rem'}}>
      <h1>Home</h1>

  {/* Search component — passes {query,type} object */}
  <Search onSearch={({ query: q, type: t }) => { setQuery(q); setType(t); }} />

      {/* Products in responsive flex grid */}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem'}}>
        {filtered.map(p => (
          <div key={p.id} style={{width: '200px', border: '1px solid #eee', borderRadius: 6, overflow: 'hidden', background:'#fff'}}>
            <Link to={`/product/${p.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <div style={{width: '100%', height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background:'#fafafa'}}>
                <img src={p.image} alt={p.name} style={{maxWidth: '100%', maxHeight: '100%'}} />
              </div>
              <div style={{padding: '0.5rem'}}>
                <div style={{fontWeight: 600}}>{p.name}</div>
                <div style={{color: '#444', marginTop: 6}}>{p.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}