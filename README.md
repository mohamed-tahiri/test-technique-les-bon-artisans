# 💻 Test Technique – Les Bons Artisans

**Auteur :** Mohamed Tahiri  
**Objectif :** Créer une application complète (backend + frontend) pour gérer des produits.

---

## 🚀 Stack technique

---
### Docker compose (`docker-compose.yml`)

#### 💡 Commandes utiles :

##### 🏁 Démarrer les services :
```bash
docker-compose up -d
```

##### 🧹 Arrêter et supprimer les conteneurs :
```bash
docker-compose down
```

##### 🧾 Consulter les logs :
```bash
docker-compose logs -f
```

##### 🌐 Accès :
- **MongoDB** : mongodb://mhdtahiri01:medtahiri1@localhost:27017
- **Mongo Express** : http://localhost:8081
- **MailHog** : http://localhost:8025

---
## Backend (`/server`)

L’API backend est développée avec **Node.js** et **Express**, offrant une solution robuste pour la gestion complète des produits. Voici les principales caractéristiques :

##### Architecture RESTful
- Gestion des produits (CRUD) avec **pagination** pour une performance et une expérience utilisateur optimales.

##### Base de données
- **MongoDB** avec **Mongoose** pour un schéma flexible et des interactions rapides avec la base.

##### Sécurité et configuration
- **CORS** pour gérer les échanges sécurisés entre le frontend et le backend.
- **Dotenv** pour la gestion des variables d’environnement sensibles.
- **ESLint** pour garantir un code propre et maintenable.

##### Fonctionnalités avancées (Bonus)
- **Authentification JWT** : Support des tokens d’accès et de rafraîchissement pour sécuriser l’accès aux ressources.
- **Swagger** : Documentation interactive des API pour faciliter le développement et les tests.
- **Envoi d’emails avec Nodemailer** : Notifications professionnelles et automatisées (ex. création de compte).
- **Validation des requêtes avec Joi** : Assure l’intégrité des données entrantes.

##### Optimisation des ressources
- **Socket.io** n’est pas utilisé car l’application se concentre sur le CRUD des produits, permettant ainsi de réduire la consommation mémoire.

---
## Frontend (`/frontend`)

Le frontend est développé avec **ReactJS** (via **Vite** pour une configuration rapide et performante), offrant une interface moderne et réactive pour la gestion des produits.

##### Framework et Bibliothèques
- **ReactJS** : Bibliothèque moderne pour construire des interfaces utilisateur réactives.
- **Vite** : Outil de build ultra-rapide pour un développement fluide.
- **Material UI (MUI v5)** : Composants UI élégants et responsives pour une expérience utilisateur professionnelle.
- **Axios** : Gestion des requêtes HTTP avec un code clair et maintenable.

##### Fonctionnalités avancées (Bonus)
- **Redux Toolkit** : Gestion centralisée et optimisée de l’état global de l’application.

---
## 🏗️ Structure du projet

Le projet est organisé de manière claire et modulable pour séparer le frontend du backend tout en facilitant le déploiement avec Docker :

test-technique-les-bon-artisans/
├── server/ # API REST Node.js avec Express, MongoDB et fonctionnalités CRUD
├── frontend/ # Application ReactJS moderne avec Material UI et Redux Toolkit
├── docker-compose.yml # Configuration Docker pour MongoDB, Mailhog et Mongo Express
└── README.md # Documentation complète du projet

##### ✅ Points clés de l’architecture
- **Séparation claire** : Backend et frontend isolés pour faciliter le développement et la maintenance.
- **Dockerisé** : Déploiement simplifié avec les services nécessaires (DB, mail, interface d’administration).
- **Documentation intégrée** : README.md décrit toute la stack, l’architecture et les fonctionnalités.


---
## ⚙️ Installation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/mohamed-tahiri/test-technique-les-bon-artisans
cd test-technique-les-bon-artisans
```

### 2️⃣ Installation du backend
```bash
```bash
# Se positionner dans le dossier backend
cd server

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env
```
#### 🔧 Configuration du fichier .env
Ajouter les éléments suivants dans .env :
```bash
PORT=5001
MONGO_URI=mongodb://mhdtahiri01:medtahiri1@localhost:27017/admin

JWT_SECRET=9f4b2e1c7a6d3f8b5e0c9a2d1f7e6b3a9f4b2e1c7a6d3f8b5e0c9a2d1f7e6b3asalkduhaskdjhdjbhfhdas
JWT_SECRET_DATE_EXPIRED=1h

JWT_REFRESH_SECRET=4a8f7e9c2b1d6e3f5a0b8c7d9e2f4a6b4a8f7e9c2b1d6e3f5a0b8c7d9e2f4a6bsakjdhhjaskdhjkhdjhkhk
JWT_REFRESH_SECRET_DATE_EXPIRED=7d

SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=mhdtahiri01@gmail.com
SMTP_PASS='kand cvzb lqwr yzjd'
```
#### 🏁 Initialisation de la base de données et démarrage du serveur
```bash
# Remplir la base avec des données de test
npm run seed

# Lancer le serveur en mode développement
npm run dev
```

### 3️⃣ Installation du frontend
```bash
# Se positionner dans le dossier frontend
cd ../frontend

# Installer les dépendances
npm install
```
#### 🔧 Configuration du fichier .env
Ajouter les éléments suivants dans .env :

```bash
VITE_API_URL=http://localhost:5001/api
```

#### 🏁 Démarrage de l’application
```bash
npm run dev
```

## 🔗 Endpoints API

### Authentification
| Méthode | Route | Description |
|----------|--------|-------------|
| **POST** | `/api/auth/register` | Crée un compte utilisateur et envoie un email de bienvenue |
| **POST** | `/api/auth/login` | Connexion utilisateur et retour des tokens JWT |
| **POST** | `/api/auth/refresh-token` | Renouvelle le token d’accès avec le refresh token |
| **POST** | `/api/auth/logout` | Déconnexion et suppression du refresh token |

### Produits
| Méthode | Route | Description |
|----------|--------|-------------|
| **GET** | `/api/products` | Liste tous les produits (avec pagination et filtres) |
| **GET** | `/api/products/:id` | Récupère un produit spécifique par son ID |
| **POST** | `/api/products` | Crée un nouveau produit |
| **PUT** | `/api/products/:id` | Modifie un produit existant |
| **DELETE** | `/api/products/:id` | Supprime un produit |

### Documentation interactive
Toutes les API sont documentées via **Swagger**.  
Pour accéder à la documentation et tester les endpoints :  

[http://localhost:5001/api-docs](http://localhost:5001/api-docs)

> ⚡ Les endpoints produits prennent en charge :  
> - Pagination (`?page=1&limit=10`)  
> - Filtres (`?search=nom&type=type&minPrice=0&maxPrice=100`)  
> - Validation des données entrantes via **Joi**  
> - Sécurisation via **JWT** (pour les routes protégées si activé)  

## 📅 Livraison

Dépôt GitHub public : [https://github.com/mohamed-tahiri/test-technique-les-bon-artisans](https://github.com/mohamed-tahiri/test-technique-les-bon-artisans)

## 👨‍💻 Auteur

Mohamed Tahiri
📧 mhdtahiri01@gmail.com

📱 +33 7 59 35 67 96
 
---