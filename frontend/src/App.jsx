import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [filters, setFilters] = useState({
    category: 'mobile',
    brand: 'Mercado Livre',
  });
  // const [search, setSearch] = useState('');

  const filterChange = ({ target }) => {
    const { id, value } = target;
    setFilters({ ...filters, [id]: value });
  };

  const inputChange = ({ target }) => {
    // setSearch(target.value);
    console.log(target);
  };

  const submitSearch = () => {

  };
  useEffect(() => {
  }, []);

  return (
    <div className="container">
      <h1>Search Page</h1>
      <div className="filters">
        <label htmlFor="category">
          Category:
          <select id="category" name="category" onChange={(e) => filterChange(e)}>
            <option value="mobile">Mobile</option>
            <option value="refrigerator">Refrigerator</option>
            <option value="tv">TV</option>
          </select>
        </label>
        <label htmlFor="brand">
          Brand:
          <select id="brand" name="brand" onChange={(e) => filterChange(e)}>
            <option value="Mercado Livre">Mercado Livre</option>
            <option value="Buscapé">Buscapé</option>
          </select>
        </label>
      </div>
      <div className="search-box">
        <input type="text" id="search-input" placeholder="Search..." onChange={(e) => inputChange(e)} />
        <button type="button" id="search-button" onClick={submitSearch}>Search</button>
      </div>
      <div className="results">
        <p>No results found.</p>
      </div>
    </div>
  );
}

export default App;
