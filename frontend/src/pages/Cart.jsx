import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        '/api/cart/remove',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        '/api/cart/update',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);
  };

  if (loading) return <p>Loading...</p>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
        <button onClick={() => navigate('/')} className="btn-continue-shopping">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <img src={item.productId.image} alt={item.productId.name} />
              
              <div className="item-details">
                <h3>{item.productId.name}</h3>
                <p className="price">${item.productId.price}</p>
                
                {item.engraving && (
                  <p className="engraving-info">
                    Engraving: {item.engraving.text} ({item.engraving.fontStyle})
                  </p>
                )}
              </div>

              <div className="item-quantity">
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.productId._id, parseInt(e.target.value))}
                />
              </div>

              <div className="item-total">
                <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
              </div>

              <button
                className="btn-remove"
                onClick={() => handleRemoveItem(item.productId._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>${calculateTotal() > 100 ? '0.00' : '10.00'}</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%):</span>
            <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>
              ${
                (
                  calculateTotal() +
                  (calculateTotal() > 100 ? 0 : 10) +
                  calculateTotal() * 0.1
                ).toFixed(2)
              }
            </span>
          </div>
          
          <button
            className="btn-checkout"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;