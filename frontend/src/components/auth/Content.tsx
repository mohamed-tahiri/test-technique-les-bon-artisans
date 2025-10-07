import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const items = [
  {
    title: 'Fullstack Development',
    description:
      'Développement d’une application complète avec backend Node.js/Express et frontend React. Backend conteneurisé avec Docker/Docker-Compose, authentification JWT',
  },
  {
    title: 'State Management',
    description:
      'Utilisation de Redux pour gérer l’état global de l’application et synchroniser les composants de manière efficace.',
  },
  {
    title: 'Interactive UI',
    description:
      'Création d’interfaces réactives et responsives avec Material-UI, incluant formulaires, modals, tableaux et filtres selon les besoins fonctionnels.',
  },
  {
    title: 'Scalable Architecture',
    description:
      'Architecture modulable et maintenable, facilitant le développement, le test et le déploiement grâce à Docker et aux bonnes pratiques de code.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 500 }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <img
          alt="Les Bons Artisans"
          src="/logo.png"
        />
      </Stack>
      <Stack>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Test technique Les Bons Artisans
        </Typography>
      </Stack>

      {/* Liste des items */}
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
