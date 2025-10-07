// src/components/products/DeleteConfirmModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ open, onClose, onConfirm, productName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <Typography>
          Voulez-vous vraiment supprimer le produit <strong>{productName}</strong> ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Annuler</Button>
        <Button onClick={onConfirm} color="error" variant="contained">Supprimer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
