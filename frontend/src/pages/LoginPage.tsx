import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Content from '../components/auth/Content';
import LoginCard from '../components/auth/LoginCard';

export default function SignInSide() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{ minHeight: '100vh' }}
    >
      {/* Partie gauche / contenu scrollable */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 4,
        }}
      >
        <Content />
      </Box>

      {/* Partie droite / LoginCard fixée */}
      <Box
        sx={{
          width: { xs: '100%', md: 400 }, // fixe la largeur sur desktop
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          backgroundColor: '#f9fafb', // ou autre couleur/fond
        }}
      >
        <LoginCard />
      </Box>
    </Stack>
  );
}
