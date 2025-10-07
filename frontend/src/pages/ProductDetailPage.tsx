import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import type { Product } from '../types/product';
import { getProduct } from '../services/productService';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const numericId = Number(id);
        const data = await getProduct(numericId);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement du produit.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Stack className="h-screen justify-center items-center">
        <CircularProgress />
      </Stack>
    );
  }

  if (error || !product) {
    return (
      <Stack className="py-8 bg-gray-50 min-h-screen font-montserrat">
        <Typography color="error">{error || 'Produit introuvable'}</Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#ec5a13',
            color: 'white',
            borderRadius: '1rem',
            px: '1.5rem',
            '&:hover': { backgroundColor: '#d14e0f' },
          }}
          onClick={() => navigate('/products')}
        >
          Retour à la liste
        </Button>
      </Stack>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen font-montserrat">
      <Card
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          boxShadow: 4,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <CardMedia
          component="img"
          height="280"
          image="https://placehold.co/700x280?text=Image+Produit"
          alt={product.name}
          sx={{
            objectFit: 'cover',
            borderBottom: '1px solid #e5e7eb',
          }}
        />

        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: '#2b3441' }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ color: '#6b7280', mb: 2 }}
          >
            Type : {product.type}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.5}>
            <Typography variant="body1">
              <strong>💰 Prix :</strong> {product.price} €
            </Typography>
            <Typography variant="body1">
              <strong>🛡️ Garantie :</strong> {product.warranty_years} ans
            </Typography>
            <Typography variant="body1">
              <strong>⭐ Note moyenne :</strong> {product.rating}/5
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: product.available ? 'green' : 'red',
                fontWeight: 600,
              }}
            >
              <strong>Disponibilité :</strong>{' '}
              {product.available ? 'En stock' : 'Rupture'}
            </Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
              sx={{
                backgroundColor: '#ec5a13',
                color: 'white',
                borderRadius: '1rem',
                px: '2rem',
                py: '.6rem',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#d14e0f' },
              }}
            >
              Retour à la liste
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
