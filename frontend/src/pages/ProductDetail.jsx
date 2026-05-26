import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState({
    text: '',
    fontStyle: 'classic',
    location: 'outside',
  });
  const [loading, setLoading] = useState(true);
  const [engravingOptions, setEngravingOptions] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchEngravingOptions();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEngravingOptions = async () => {
    try {
      const response = await axios.get('/api/engraving/options');
      setEngravingOptions(response.data);
    } catch (error) {
      console.error('Error fetching engraving options:', error);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        '/api/cart/add',
        {
          productId: id,
          quantity,
          engraving: product.engraveable ? engraving : null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Product added to cart!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <div className="product-image-section">
        <img src={product.image} alt={product.name} className="main-image" />
        <div className="thumbnail-images">
          {product.images?.map((img, idx) => (
            <img key={idx} src={img} alt={`${product.name} ${idx}`} />
          ))}
        </div>
      </div>

      <div className="product-info-section">
        <h1>{product.name}</h1>
        <p className="category">Category: {product.category}</p>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span className="rating-count">({product.reviews?.length || 0} reviews)</span>
        </div>

        <div className="price-section">
          <span className="price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>

        <p className="description">{product.description}</p>

        <div className="specifications">
          <h3>Specifications</h3>
          <ul>
            <li><strong>Material:</strong> {product.specifications?.material}</li>
            <li><strong>Weight:</strong> {product.specifications?.weight}</li>
            <li><strong>Collection:</strong> {product.specifications?.collection}</li>
          </ul>
        </div>

        {product.engraveable && engravingOptions && (
          <div className="engraving-section">
            <h3>Personalize with Engraving</h3>
            
            <div className="engraving-form">
              <div className="form-group">
                <label>Engraving Text (Max 50 characters)</label>
                <input
                  type="text"
                  value={engraving.text}
                  onChange={(e) => setEngraving({ ...engraving, text: e.target.value })}
                  maxLength="50"
                  placeholder="Enter text to engrave"
                />
              </div>

              <div className="form-group">
                <label>Font Style</label>
                <select
                  value={engraving.fontStyle}
                  onChange={(e) => setEngraving({ ...engraving, fontStyle: e.target.value })}
                >
                  {engravingOptions.fontStyles?.map(font => (
                    <option key={font.id} value={font.id}>{font.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <select
                  value={engraving.location}
                  onChange={(e) => setEngraving({ ...engraving, location: e.target.value })}
                >
                  {engravingOptions.locations?.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="purchase-section">
          <div className="quantity-selector">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          
          <button className="btn-add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;