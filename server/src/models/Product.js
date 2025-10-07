const mongoose = require('mongoose');
const autoIncrementModelID = require('./counterModel');

const productSchema = new mongoose.Schema({
  _id: Number, // ID incrémenté
  name: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  warranty_years: { type: Number, required: true },
  available: { type: Boolean, default: true },
  image: { type: String },
});

productSchema.pre('save', function (next) {
  if (!this.isNew) return next();
  autoIncrementModelID('productId', this, next);
});

module.exports = mongoose.model('Product', productSchema);
