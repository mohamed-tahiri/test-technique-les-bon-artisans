const mongoose = require('mongoose');
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('counter', counterSchema);

const autoIncrementModelID = async function (modelName, doc, next) {
  try {
    const Product = mongoose.model('Product');

    // Récupérer le plus grand _id existant dans Product
    const maxProduct = await Product.findOne().sort({ _id: -1 }).lean();
    const startSeq = maxProduct ? maxProduct._id : 0;

    // Récupérer ou créer le compteur
    let counter = await Counter.findById(modelName);
    if (!counter) {
      counter = new Counter({ _id: modelName, seq: startSeq });
      await counter.save();
    } else if (counter.seq < startSeq) {
      counter.seq = startSeq;
      await counter.save();
    }

    // Incrémenter le compteur
    counter.seq += 1;
    await counter.save();

    doc._id = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = autoIncrementModelID;
