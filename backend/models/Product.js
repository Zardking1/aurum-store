const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['watches', 'rings', 'bracelets', 'necklaces', 'earrings'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: Number,
  material: String,
  sku: String,
  image: String,
  images: [String],
  stock: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  specifications: {
    material: String,
    weight: String,
    dimensions: String,
    waterResistance: String,
    collection: String,
    movement: String,
  },
  engraveable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
