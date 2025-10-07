import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Chip,
  CardMedia,
  Divider,
  Rating,
} from '@mui/material';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card
      onClick={handleNavigate}
      className="transition-transform hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer"
    >
      <CardMedia
        component="img"
        height="180"
        image={'https://placehold.co/300x180'}
        alt={product.name}
      />

      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="h6"
            fontWeight="bold"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            className="hover:text-blue-600"
          >
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.type}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
            <Typography variant="body2">
              Prix : <strong>€{product.price.toFixed(2)}</strong>
            </Typography>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2">Note :</Typography>
              <Rating value={product.rating} precision={0.5} readOnly size="small" />
            </Stack>

            <Typography variant="body2">
              Garantie : <strong>{product.warranty_years} ans</strong>
            </Typography>
          </Stack>

          <Chip
            label={product.available ? 'Disponible' : 'Indisponible'}
            color={product.available ? 'success' : 'error'}
            size="small"
            sx={{ mt: 1 }}
          />

          <Stack direction="row" spacing={1} className="mt-3">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
            >
              Modifier
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product);
              }}
            >
              Supprimer
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
