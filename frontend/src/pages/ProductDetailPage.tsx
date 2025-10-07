import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Divider
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
      <Stack className="h-screen justify-center items-center">
        <Typography color="error">{error || 'Produit introuvable'}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/products')}>
          Retour à la liste
        </Button>
      </Stack>
    );
  }

  return (
    <div className="p-6 md:p-12">
      <Card
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          boxShadow: 3,
          borderRadius: 3,
          p: 2
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Type : {product.type}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom>
            <strong>Prix :</strong> {product.price} €
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Garantie :</strong> {product.warranty_years} ans
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Note moyenne :</strong> {product.rating}/5
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Disponibilité :</strong> {product.available ? 'En stock' : 'Rupture'}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
            Retour à la liste
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
