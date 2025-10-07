import React, { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { CircularProgress, Stack, Typography, Button, Grid, Pagination } from '@mui/material';
import ProductFilter from '../components/products/ProductFilter';
import ProductGrid from '../components/products/ProductGrid';
import ProductForm from '../components/products/ProductForm';
import DeleteConfirmModal from '../components/products/DeleteConfirmModal';

interface ProductFilters {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  type?: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<ProductFilters>({ search: '' });

  const [formData, setFormData] = useState<Omit<Product, '_id'>>({
    name: '',
    type: '',
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: true,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const queryParams = {
        page,
        limit: 10,
        name: filters.search || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        available: filters.available,
        type: filters.type,
      };

      const data = await getProducts(queryParams);
      setProducts(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', type: '', price: 0, rating: 0, warranty_years: 0, available: true });
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, formData);
        setProducts(products.map(p => (p._id === updated._id ? updated : p)));
      } else {
        const created = await createProduct(formData);
        setProducts([...products, created]);
      }
      handleCloseForm();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete._id);
      setProducts(products.filter(p => p._id !== productToDelete._id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    } finally {
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  if (error)
    return (
      <Stack className="h-screen justify-center items-center">
        <Typography color="error">{error}</Typography>
      </Stack>
    );

  return (
    <div className="p-4 md:p-8">
      <Stack direction="row" justifyContent="space-between" className="mb-4">
        <Typography variant="h4">Liste des produits</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
          Créer un produit
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid  size={{ xs: 12, md: 3 }}>
          <ProductFilter filters={filters} setFilters={setFilters} />
        </Grid>

        <Grid  size={{ xs: 12, md: 9 }}>
          {loading ? (
            <Stack sx={{ height: '60vh', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <CircularProgress />
            </Stack>
          ) : (
            <>
              <ProductGrid products={products} onEdit={handleOpenForm} onDelete={handleDeleteClick} />

              <Stack alignItems="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, newPage) => setPage(newPage)}
                  color="primary"
                />
              </Stack>
            </>
          )}
        </Grid>
      </Grid>

      <ProductForm
        open={openForm}
        product={editingProduct}
        formData={formData}
        setFormData={setFormData}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name || ''}
      />
    </div>
  );
};

export default ProductsPage;
