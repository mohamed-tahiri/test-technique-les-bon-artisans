// Footer.tsx
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      className="py-6 px mt-auto bg-[#2b3441] text-white"
    >
      <Typography className="text-center text-sm md:text-base font-medium">
        © {new Date().getFullYear()} - Application Produits - Med TAHIRI
      </Typography>
    </Box>
  );
};

export default Footer;
