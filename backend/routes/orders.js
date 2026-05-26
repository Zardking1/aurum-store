const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Generate order number
const generateOrderNumber = () => {
  return 'ORD-' + Date.now();
};

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order details
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, paymentStatus, transactionId } = req.body;

    // Get cart
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = cart.items.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      subtotal += itemTotal;
      return {
        productId: item.productId._id,
        productName: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
        engraving: item.engraving,
      };
    });

    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    // Create order
    const order = new Order({
      userId: req.user.userId,
      orderNumber: generateOrderNumber(),
      items: orderItems,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      transactionId,
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate(
      { userId: req.user.userId },
      { items: [] }
    );

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel order
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({ message: 'Cannot cancel shipped or delivered orders' });
    }

    order.status = 'cancelled';
    order.updatedAt = new Date();
    await order.save();

    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;