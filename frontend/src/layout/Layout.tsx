import React,{ type ReactNode }  from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box 
              sx={{
                backgroundColor: '#f9fafb',
                px: {
                  xs: '1rem',   
                  sm: '2rem',   
                  md: '4rem',   
                  lg: '10rem',   
                  xl: '12rem',  
                },
              }}
            >
            {children}
            </Box>
            <Footer />
        </Box>
  );
};

export default Layout;
