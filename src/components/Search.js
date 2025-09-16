
import React, { useState } from 'react';
import SearchResults from './SearchResults';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    fetch('http://localhost:3001/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error searching:', error));
  };

  return (
    <div>
      <div className="toolbar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for threats, actors, etc..." 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults results={results} />
    </div>
  );
}

export default Search;
