import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import ProductCard from './Cards/productCard';

function App() {
  const [filters, setFilters] = useState({
    brand: 'mercadolivre',
    category: 'mobile',
  });
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const filterChange = ({ target }) => {
    const { id, value } = target;
    setFilters({ ...filters, [id]: value });
  };

  const inputChange = ({ target }) => {
    setSearch(target.value);
  };

  const submitSearch = async () => {
    setLoading(true);
    const api = axios.create({
      baseURL: 'http://localhost:3000',
    });
    const url = `/${filters.brand}/${filters.category}/search?q=${search}`;
    await api.get(url)
      .then((response) => {
        setProducts(response.data[0]);
      })
      .catch((error) => error);
  };

  useEffect(() => {
    setLoading(false);
  }, [products]);

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
            <option value="mercadolivre">Mercado Livre</option>
            <option value="buscape">Buscapé</option>
          </select>
        </label>
      </div>
      <div className="search-box">
        <input type="text" id="search-input" placeholder="Search..." onChange={(e) => inputChange(e)} />
        <button type="button" id="search-button" onClick={submitSearch}>Search</button>
      </div>
      <div className="results">
        {
          loading ? (<p>No results found.</p>)
            : (
              <div className="product-grid">
                {products?.results?.map((product) => (
                  <ProductCard
                    key={product.price + Math.random()}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                  />
                ))}
              </div>
            )
        }
      </div>
    </div>
  );
}

export default App;
