// src/components/products/ProductFilter.tsx
import React from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Button,
  Paper,
  Typography,
  Divider,
} from '@mui/material';

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
          : value,
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
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        backgroundColor: '#f9fafb', // équivalent Tailwind bg-gray-50
        borderRadius: '1rem',
        border: '1px solid rgba(43, 52, 65, 0.1)',
        position: 'sticky',
        top: 16,
      }}
      className="w-full md:max-w-sm"
    >
      <Typography
        variant="h6"
        className="font-semibold text-gray-800 mb-4 text-center text-lg md:text-xl"
      >
        🔍 Filtres Produits
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {/* Champ recherche */}
        <TextField
          label="Nom ou Type"
          name="search"
          value={filters.search || ''}
          onChange={handleChange}
          fullWidth
          size="small"
        />

        {/* Prix min / max en grid responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <TextField
            label="Prix min"
            name="minPrice"
            type="number"
            value={filters.minPrice ?? ''}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Prix max"
            name="maxPrice"
            type="number"
            value={filters.maxPrice ?? ''}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>

        {/* Garantie min */}
        <TextField
          label="Garantie min (ans)"
          name="minWarranty"
          type="number"
          value={filters.minWarranty ?? ''}
          onChange={handleChange}
          fullWidth
          size="small"
        />

        {/* Note min */}
        <TextField
          label="Note min"
          name="minRating"
          type="number"
          value={filters.minRating ?? ''}
          onChange={handleChange}
          fullWidth
          size="small"
        />

        {/* Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.available ?? false}
              onChange={handleChange}
              name="available"
              sx={{
                color: '#ec5a13',
                '&.Mui-checked': { color: '#ec5a13' },
              }}
            />
          }
          label="Disponible uniquement"
          sx={{
            color: '#2b3441',
            '& .MuiTypography-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
          }}
        />

        {/* Bouton réinitialiser */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ec5a13',
            color: 'white',
            borderRadius: '1rem',
            px: { xs: 1, sm: 3 },
            py: { xs: 0.8, sm: 1 },
            textTransform: 'none',
            fontWeight: 600,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '&:hover': { backgroundColor: '#d14e0f' },
          }}
          onClick={handleReset}
          fullWidth
        >
          Réinitialiser
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProductFilter;
