import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Luxury Jewelry & Watches</h1>
          <p>Discover our exquisite collection of premium jewelry and timepieces</p>
        </div>
      </section>

      <section className="products-section">
        <div className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search products"
            />
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="watches">Watches</option>
              <option value="rings">Rings</option>
              <option value="bracelets">Bracelets</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
            />
          </div>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="10000"
            />
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="description">{product.description?.substring(0, 50)}...</p>
                <div className="product-footer">
                  <span className="price">${product.price}</span>
                  <button className="btn-view">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;