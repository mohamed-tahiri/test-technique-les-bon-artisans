// src/components/ProductForm.tsx
import React from 'react';
import type { Product } from '../../types/product';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
} from '@mui/material';

interface ProductFormProps {
  open: boolean;
  product: Product | null;
  formData: Omit<Product, '_id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Product, '_id'>>>;
  onClose: () => void;
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  open,
  product,
  formData,
  setFormData,
  onClose,
  onSubmit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-lg font-semibold">
        {product ? 'Modifier le produit' : 'Créer un produit'}
      </DialogTitle>

      <DialogContent className="flex flex-col gap-4 min-w-[430px] p-3 bg-gray-50 rounded-lg">
        <Stack spacing={2}>
          <TextField
            label="Nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Prix"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Note"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Garantie (ans)"
            name="warranty_years"
            type="number"
            value={formData.warranty_years}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.available}
                onChange={handleChange}
                name="available"
                sx={{
                  color: '#ec5a13',
                  '&.Mui-checked': { color: '#ec5a13' },
                }}
              />
            }
            label="Disponible"
            sx={{ color: '#2b3441' }}
          />
        </Stack>
      </DialogContent>

      <DialogActions className="px-4 pb-4">
        <Button onClick={onClose}  
        
            sx={{
              color: '#4B5563',
            }}
          >
          Annuler
        </Button>
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
            '&:hover': { backgroundColor: '#d14e0f' },
          }}
          onClick={onSubmit}
        >
          {product ? 'Mettre à jour' : 'Créer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
