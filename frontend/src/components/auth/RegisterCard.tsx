import * as React from 'react';
import { Box, Button, Card as MuiCard, FormLabel, FormControl, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { register } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store/store';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px',
  [theme.breakpoints.up('sm')]: { width: '450px' },
}));

export default function RegisterCard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = 'Veuillez entrer votre nom complet.';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Veuillez entrer un email valide.';
    if (!form.password || form.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await dispatch(register(form)).unwrap();
      navigate('/products');
    } catch {
      alert("Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4">Inscription</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <FormLabel>Nom complet</FormLabel>
          <TextField name="name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} placeholder="Ex: Mohamed Tahiri" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel>Email</FormLabel>
          <TextField name="email" type="email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} placeholder="exemple@email.com" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel>Mot de passe</FormLabel>
          <TextField name="password" type="password" value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} placeholder="••••••" />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" disabled={loading}>{loading ? "Création..." : "S'inscrire"}</Button>
        <Typography sx={{ textAlign: 'center' }}>
          Vous avez déjà un compte ? <Link href="/login" variant="body2">Connectez-vous</Link>
        </Typography>
      </Box>
    </Card>
  );
}
