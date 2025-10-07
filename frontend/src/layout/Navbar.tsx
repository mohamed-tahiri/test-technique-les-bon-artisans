// Navbar.tsx
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import type { AppDispatch, RootState } from '../store/store';

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'white',
        boxShadow: 'none',
        borderBottom: '.05rem solid #2b3441',
        px: {
          xs: '1rem',   
          sm: '2rem',   
          md: '4rem',   
          lg: '10rem',   
          xl: '12rem',  
        },
      }}
    >
    <Toolbar className="flex justify-between items-center w-full px-4 md:px-8">
      <Typography className="text-gray-900 font-extrabold text-lg md:text-xl">
        Les Bons <span className="font-bold">Artisans</span>
      </Typography>

      {auth && (
        <Stack direction="row" alignItems="center" spacing={3}>
          <Typography className="text-gray-800 font-medium">
            👋 Bonjour, <span className="font-bold">{auth.user.name}</span>
          </Typography>
          <Button
            variant="contained"       
            
            sx={{
              backgroundColor: '#ec5a13',
              color: 'white',
              borderRadius: '1rem',
              px: '1.5rem',
              py: '.5rem',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#d14e0f',
              },
            }}

            onClick={() => dispatch(logout())}
          >
            Déconnexion
          </Button>
        </Stack>
      )}
    </Toolbar>

    </AppBar>
  );
};

export default Navbar;
