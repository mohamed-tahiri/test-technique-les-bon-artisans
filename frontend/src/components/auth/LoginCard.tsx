import * as React from 'react';
import {
  Box,
  Button,
  Card as MuiCard,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { login } from '../../slices/authSlice';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function LoginCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Veuillez entrer un email valide.';
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await dispatch(login(form)).unwrap();
      navigate('/products');
    } catch {
      setErrorMessage('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        backgroundColor: '#f9fafb',
        width: { xs: '100%', md: 400 },
      }}
    >
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <FormLabel>Email</FormLabel>
            <TextField
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="exemple@email.com"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel>Mot de passe</FormLabel>
            <TextField
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              placeholder="••••••"
            />
          </FormControl>
          {errorMessage && (
            <Typography color="error" sx={{ mt: 1, mb: 1 }}>
              {errorMessage}
            </Typography>
          )}

          {/* Bouton complètement adapté */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#ec5a13',
              color: 'white',
              borderRadius: '1rem',
              px: '1.5rem',
              py: '.5rem',
              textTransform: 'none',
              width: '100%',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#d14e0f',
              },
            }}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Vous n'avez pas de compte ?{' '}
            <Link href="/register" variant="body2">
              Inscrivez-vous
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
