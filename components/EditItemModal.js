// components/EditItemModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useInventory } from "../context/Inventory";

const EditItemModal = ({ open, handleClose, currentItem }) => {
  const [itemName, setItemName] = useState(currentItem ? currentItem.name : "");
  const [quantity, setQuantity] = useState(currentItem ? currentItem.quantity : 1);
  const { updateItem } = useInventory();

  useEffect(() => {
    if (currentItem) {
      setItemName(currentItem.name);
      setQuantity(currentItem.quantity);
    }
  }, [currentItem]);

  const handleUpdateItem = () => {
    if (itemName.trim() === "") {
      alert("Item name cannot be empty");
      return;
    }
    if (quantity <= 0) {
      alert("Quantity must be greater than zero");
      return;
    }
    updateItem(currentItem.id, { name: itemName, quantity });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2">Edit Item</Typography>
        <TextField
          label="Item Name"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleUpdateItem} sx={{ mt: 2 }}>
          Update Item
        </Button>
      </Box>
    </Modal>
  );
};

export default EditItemModal;
