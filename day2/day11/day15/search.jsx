import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('all');

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        onSearch({ query, type });
    };

    // live search when typing or changing type
    const handleQueryChange = (e) => {
        const v = e.target.value;
        setQuery(v);
        onSearch({ query: v, type });
    };

    const handleTypeChange = (e) => {
        const t = e.target.value;
        setType(t);
        onSearch({ query, type: t });
    };

    return (
        <form onSubmit={handleSearch} style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <input 
                type="text" 
                value={query} 
                onChange={handleQueryChange} 
                placeholder="Search by name..." 
                style={{padding: '0.4rem', flex: '1 1 300px'}}
            />

            <select value={type} onChange={handleTypeChange} style={{padding: '0.4rem'}}>
                <option value="all">All types</option>
                <option value="electronics">Electronics</option>
                <option value="wearable">Wearable</option>
                <option value="accessory">Accessory</option>
            </select>

            <button type="submit" style={{padding: '0.4rem 0.6rem'}}>Search</button>
        </form>
    );
};

export default Search;