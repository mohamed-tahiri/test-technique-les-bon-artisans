const Product = require('../models/Product');

// GET all products (avec pagination et filtres)
exports.getAllProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      available,
      type,
      name,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const filters = {};

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    if (available !== undefined) {
      filters.available = available === 'true';
    }

    if (type) {
      filters.type = { $regex: type, $options: 'i' }; // recherche insensible à la casse
    }

    if (name) {
      filters.name = { $regex: name, $options: 'i' };
    }

    const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filters).sort(sortOptions).skip(skip).limit(Number(limit)),
      Product.countDocuments(filters),
    ]);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      data: products,
    });
  } catch (err) {
    next(err);
  }
};


// GET single product
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// CREATE product
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// UPDATE product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    next(err);
  }
};
