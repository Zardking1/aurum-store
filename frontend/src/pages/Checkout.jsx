import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    const subtotal = cart.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    return subtotal + shipping + tax;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        '/api/orders',
        {
          shippingAddress,
          paymentMethod,
          paymentStatus: 'completed',
          transactionId: 'TXN-' + Date.now(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Order placed successfully!');
      navigate(`/order-confirmation/${response.data.order._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Address</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={shippingAddress.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={shippingAddress.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h2>Payment Method</h2>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit/Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>
              <label>
                <input
                  type="radio"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Bank Transfer
              </label>
            </div>

            <button type="submit" className="btn-place-order" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            {cart.items.map((item) => (
              <div key={item.productId._id} className="summary-item">
                <img src={item.productId.image} alt={item.productId.name} />
                <div>
                  <h4>{item.productId.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  {item.engraving && <p className="engraving">Engraved: {item.engraving.text}</p>}
                </div>
                <span className="item-price">${(item.productId.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0) > 100 ? '0.00' : '10.00'}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0) * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>${calculateTotal().toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;