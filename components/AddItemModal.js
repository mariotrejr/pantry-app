// components/AddItemModal.js
import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useInventory } from "../context/Inventory";

const AddItemModal = ({ open, handleClose }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useInventory();

  const handleAddItem = () => {
    if (itemName.trim() === "") {
      alert("Item name cannot be empty");
      return;
    }
    if (quantity <= 0) {
      alert("Quantity must be greater than zero");
      return;
    }
    addItem({ name: itemName, quantity });
    setItemName("");
    setQuantity(1);
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
        <Typography variant="h6" component="h2">Add New Item</Typography>
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
        <Button variant="contained" onClick={handleAddItem} sx={{ mt: 2 }}>
          Add Item
        </Button>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
