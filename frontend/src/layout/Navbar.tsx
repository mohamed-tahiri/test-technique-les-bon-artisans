import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import type { AppDispatch, RootState } from '../store/store';

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Test technique Les Bons Artisans</Typography>
        {auth && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1">
              👋 Bonjour, <strong>{auth.user.name}</strong>
            </Typography>
            <Button color="inherit" onClick={() => dispatch(logout())}>
              Déconnexion
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
