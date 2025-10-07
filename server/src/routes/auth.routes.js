const express = require('express');
const {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
} = require('../controllers/auth.controller.js');
const { authenticate } = require('../middlewares/auth.middleware.js');
const { validate } = require('../middlewares/validate.middleware.js');
const {
  registerSchema,
  loginSchema,
  refreshSchema,
} = require('../validators/auth.validators.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 example: "user"
 *               password:
 *                 type: string
 *                 example: "supersecurepassword"
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/register', validate(registerSchema), registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "supersecurepassword"
 *     responses:
 *       200:
 *         description: Connexion réussie avec tokens JWT
 *       401:
 *         description: Email ou mot de passe invalide
 */
router.post('/login', validate(loginSchema), loginController);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Rafraîchir le token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nouveau token d'accès généré
 *       403:
 *         description: Token invalide
 */
router.post('/refresh', validate(refreshSchema), refreshTokenController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Token manquant ou invalide
 */
router.post('/logout', authenticate, logoutController);

module.exports = router;
