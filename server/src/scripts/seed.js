const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const data = [
  { name: 'AC1 Phone1', type: 'phone', price: 200.05, rating: 3.8, warranty_years: 1, available: true },
  { name: 'AC2 Phone2', type: 'phone', price: 147.21, rating: 1, warranty_years: 3, available: false },
  { name: 'AC3 Phone3', type: 'phone', price: 150, rating: 2, warranty_years: 1, available: true },
  { name: 'AC4 Phone4', type: 'phone', price: 50.20, rating: 3, warranty_years: 2, available: true }
];

const dataUser = [
  { name: 'Mohamed TAHIRI', email: 'mhdtahiri@gmail.com', password: 'testtest' },
  { name: 'Mohamed TAHIRI', email: 'mhdtahiri01@gmail.com', password: 'testtest' },
  { name: 'Mohamed TAHIRI', email: 'mhdtahiri02@gmail.com', password: 'testtest' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(data);
    await User.deleteMany({});
    await User.insertMany(dataUser);
    console.log('✅ Seed terminé');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
