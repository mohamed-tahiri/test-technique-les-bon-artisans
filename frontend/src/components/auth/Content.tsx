// src/components/ProjectOverview.tsx
import React from 'react';
import { Stack, Typography, Divider, Paper } from '@mui/material';

const steps = [
  {
    title: '💻 Test Technique – Les Bons Artisans',
    content:
      'Auteur : Mohamed Tahiri\nObjectif : Créer une application complète (backend + frontend) pour gérer des produits.',
  },
  {
    title: '🚀 Stack technique',
    content:
      'Docker Compose pour orchestrer MongoDB, MailHog et Mongo Express.\nBackend : Node.js + Express.\nFrontend : ReactJS avec Vite et Material UI.\nGestion des états : Redux Toolkit.',
  },
  {
    title: '💡 Commandes utiles',
    content:
      'Démarrer les services : docker-compose up -d\nArrêter et supprimer : docker-compose down\nConsulter les logs : docker-compose logs -f',
  },
  {
    title: '🌐 Accès',
    content:
      'MongoDB : mongodb://mhdtahiri01:medtahiri1@localhost:27017\nMongo Express : http://localhost:8081\nMailHog : http://localhost:8025',
  },
  {
    title: 'Backend (/server)',
    content:
      'API REST Node.js/Express avec CRUD produit et pagination.\nBase de données MongoDB/Mongoose.\nCORS et dotenv pour configuration et sécurité.\nESLint pour maintenir la qualité du code.',
  },
  {
    title: 'Frontend (/frontend)',
    content:
      'ReactJS (Vite) pour une interface moderne et réactive.\nMaterial UI pour composants UI élégants.\nAxios pour requêtes HTTP.\nRedux Toolkit pour gestion d’état globale.',
  },
  {
    title: '🏗️ Structure du projet',
    content:
      'test-technique-les-bon-artisans/\n├── server/  # Backend Node.js + MongoDB + CRUD\n├── frontend/  # ReactJS + MUI + Redux Toolkit\n├── docker-compose.yml  # Services Docker\n└── README.md  # Documentation',
  },
  {
    title: '⚙️ Installation',
    content:
      '1️⃣ Cloner le projet\n2️⃣ Installer backend\n3️⃣ Créer fichier .env avec PORT, MONGO_URI, JWT_SECRET, SMTP_CONFIG\n4️⃣ npm run seed\n5️⃣ npm run dev\n6️⃣ Installer frontend\n7️⃣ npm install\n8️⃣ Ajouter VITE_API_URL dans .env\n9️⃣ npm run dev',
  },
  {
    title: '🔗 Endpoints API',
    content:
      'Authentification : /api/auth/register, /login, /refresh-token, /logout\nProduits : /api/products (GET, POST, PUT, DELETE)\nSwagger disponible sur http://localhost:5001/api-docs',
  },
  {
    title: '📅 Livraison',
    content: 'Dépôt GitHub public : https://github.com/mohamed-tahiri/test-technique-les-bon-artisans',
  },
  {
    title: '👨‍💻 Auteur',
    content: 'Mohamed Tahiri 📧 mhdtahiri01@gmail.com\n📱 +33 7 59 35 67 96',
  },
];

export default function ProjectOverview() {
  return (
    <Stack spacing={4} sx={{ maxWidth: 800, mx: 'auto', py: 6, px: 2 }}>
      {steps.map((step, index) => (
        <Paper key={index} elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: '#f9fafb' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {step.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography
            variant="body2"
            sx={{ whiteSpace: 'pre-line', color: '#4B5563', lineHeight: 1.6 }}
          >
            {step.content}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
}
