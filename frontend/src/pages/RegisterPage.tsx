import Stack from '@mui/material/Stack';
import Content from '../components/auth/Content';
import RegisterCard from '../components/auth/RegisterCard';

export default function SignInSide() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 4, md: 12 }}
      justifyContent="center"
      alignItems="center"
      sx={{ p: 4, minHeight: '100vh' }}
    >
      <Content />
      <RegisterCard />
    </Stack>
  );
}
