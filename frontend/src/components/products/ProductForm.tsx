// src/components/ProductForm.tsx
import React from 'react';
import type { Product } from '../../types/product';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

interface ProductFormProps {
  open: boolean;
  product: Product | null;
  formData: Omit<Product, '_id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Product, '_id'>>>;
  onClose: () => void;
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ open, product, formData, setFormData, onClose, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? 'Modifier le produit' : 'Créer un produit'}</DialogTitle>
      <DialogContent className="flex flex-col gap-4 min-w-[300px]">
        <TextField label="Nom" name="name" value={formData.name} onChange={handleChange} fullWidth />
        <TextField label="Type" name="type" value={formData.type} onChange={handleChange} fullWidth />
        <TextField label="Prix" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth />
        <TextField label="Note" name="rating" type="number" value={formData.rating} onChange={handleChange} fullWidth />
        <TextField label="Garantie (ans)" name="warranty_years" type="number" value={formData.warranty_years} onChange={handleChange} fullWidth />
        <FormControlLabel control={<Checkbox checked={formData.available} onChange={handleChange} name="available" />} label="Disponible" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>{product ? 'Mettre à jour' : 'Créer'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
