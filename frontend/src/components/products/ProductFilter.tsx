  // src/components/products/ProductFilter.tsx
  import React from 'react';
  import { TextField, FormControlLabel, Checkbox, Stack, Button, Paper } from '@mui/material';

  interface ProductFilterProps {
    filters: {
      search: string;
      minPrice?: number;
      maxPrice?: number;
      minWarranty?: number;
      minRating?: number;
      available?: boolean;
    };
    setFilters: React.Dispatch<React.SetStateAction<ProductFilterProps['filters']>>;
  }

  const ProductFilter: React.FC<ProductFilterProps> = ({ filters, setFilters }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;

      setFilters(prev => ({
        ...prev,
        [name]:
          type === 'checkbox'
            ? checked
            : type === 'number'
            ? value === ''
              ? undefined
              : Number(value)
            : value, // texte => garder string '', jamais undefined
      }));
    };

    const handleReset = () => {
      setFilters({
        search: '',
        minPrice: undefined,
        maxPrice: undefined,
        minWarranty: undefined,
        minRating: undefined,
        available: undefined,
      });
    };

    return (
      <Paper elevation={2} sx={{ p: 2, position: 'sticky', top: 16 }}>
        <Stack spacing={2}>
          <TextField
            label="Nom / Type"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Prix min"
            name="minPrice"
            type="number"
            value={filters.minPrice ?? ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Prix max"
            name="maxPrice"
            type="number"
            value={filters.maxPrice ?? ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Garantie min"
            name="minWarranty"
            type="number"
            value={filters.minWarranty ?? ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Note min"
            name="minRating"
            type="number"
            value={filters.minRating ?? ''}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.available ?? false}
                onChange={handleChange}
                name="available"
              />
            }
            label="Disponible"
          />
          <Button variant="outlined" color="secondary" onClick={handleReset} fullWidth>
            Réinitialiser
          </Button>
        </Stack>
      </Paper>
    );
  };

  export default ProductFilter;
