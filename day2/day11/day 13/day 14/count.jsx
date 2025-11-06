import React, { useState } from 'react';

export default function Count() {
  const [n, setN] = useState(0);
  return (
    <div style={{ textAlign: 'center', marginTop: 12 }}>
      <button onClick={() => setN((x) => x - 1)}>-</button>
      <span style={{ margin: '0 12px', fontWeight: 600 }}>{n}</span>
      <button onClick={() => setN((x) => x + 1)}>+</button>
    </div>
  );
}