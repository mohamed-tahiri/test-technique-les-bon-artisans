const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const validateProduct = require('../validators/product.validators');
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API pour gérer les produits
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - price
 *         - rating
 *         - warranty_years
 *         - available
 *       properties:
 *         _id:
 *           type: string
 *           example: 1
 *         name:
 *           type: string
 *           example: AC1 Phone1
 *         type:
 *           type: string
 *           example: phone
 *         price:
 *           type: number
 *           example: 200.05
 *         rating:
 *           type: number
 *           example: 3.8
 *         warranty_years:
 *           type: integer
 *           example: 1
 *         available:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Liste tous les produits
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Crée un nouveau produit
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupère un produit par ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   put:
 *     summary: Met à jour un produit par ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   delete:
 *     summary: Supprime un produit par ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     responses:
 *       204:
 *         description: Produit supprimé
 */

router
  .route('/')
  .get(authenticate, productController.getAllProducts)
  .post(authenticate, validateProduct, productController.createProduct);

router
  .route('/:id')
  .get(authenticate, productController.getProduct)
  .put(authenticate, validateProduct, productController.updateProduct)
  .delete(authenticate, productController.deleteProduct);

module.exports = router;
