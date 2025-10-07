const mongoose = require('mongoose');

// Vérifie si le modèle existe déjà pour éviter l'erreur
const Counter = mongoose.models.counter || mongoose.model('counter', new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}));

// Définition du schéma User
const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }
});

// Hook avant sauvegarde pour générer l'ID
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      'users',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this._id = counter.seq;
  }
  next();
});

// Création du modèle
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
