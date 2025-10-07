import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
        component="footer"
        sx={{
            py: 2,
            mt: 'auto',
            textAlign: 'center',
            borderTop: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
        }}
    >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} - Application Produits - Med TAHIRI
        </Typography>
      </Box>
  )
}

export default Footer