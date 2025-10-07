const express = require('express');
const setupSwagger = require('./config/swagger');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Routes API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Swagger
setupSwagger(app);

// Route test
app.get('/', (req, res) => res.send('🚀 API Les Bons Artisans en ligne !'));

// Middleware gestion d'erreur
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
