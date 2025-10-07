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
      className="
        transition-transform hover:scale-[1.02] cursor-pointer 
        shadow-md hover:shadow-xl rounded-2xl 
        bg-white overflow-hidden 
        flex flex-col
        sm:max-w-xs md:max-w-sm lg:max-w-md
      "
    >
      {/* Image produit */}
      <CardMedia
        component="img"
        image={'https://placehold.co/600x400?text=Produit'}
        alt={product.name}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
      />

      {/* Contenu */}
      <CardContent className="flex flex-col justify-between p-4 sm:p-5">
        <Stack spacing={1.5}>
          {/* Nom du produit */}
          <Typography
            variant="h6"
            fontWeight="bold"
            className="text-gray-800 hover:text-orange-600 line-clamp-2"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          >
            {product.name}
          </Typography>

          {/* Type */}
          <Typography variant="body2" className="text-gray-500">
            {product.type}
          </Typography>

          <Divider />

          {/* Prix, Note et Garantie */}
          <div className="flex flex-col sm:grid-cols-3 gap-y-2 text-sm text-gray-700">
            <span>
              Prix : <strong className="text-gray-900">€{product.price.toFixed(2)}</strong>
            </span>
            <div className="flex items-center gap-1">
              <span>Note :</span>
              <Rating value={product.rating} precision={0.5} readOnly size="small" />
            </div>
            <span className="sm:col-span-1">
              Garantie : <strong>{product.warranty_years} ans</strong>
            </span>
          </div>

          {/* Disponibilité */}
          <Chip
            label={product.available ? 'Disponible' : 'Indisponible'}
            color={product.available ? 'success' : 'error'}
            size="small"
            className="mt-2 w-fit"
          />

          {/* Boutons d’action */}
          <Stack
            direction="row"
            spacing={1}
            className="mt-3 flex-wrap sm:flex-nowrap"
          >
            <Button
              size="small"
              sx={{
                backgroundColor: '#ec5a13',
                color: 'white',
                '&:hover': { backgroundColor: '#ec5a13', color: 'white' },
                flex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
            >
              Modifier
            </Button>

            <Button
              size="small"
              sx={{
                backgroundColor: '#e5e7eb',
                color: 'white',
                flex: 1,
              }}
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
