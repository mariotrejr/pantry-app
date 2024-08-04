// components/InventoryList.js
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, TextField } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';
import { useInventory } from '../context/Inventory';

const InventoryList = () => {
  const { inventory, removeItem, loading } = useInventory();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleOpenEditModal = (item) => {
    setCurrentItem(item);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4">Inventory Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
          sx={{ mt: 2 }}
        >
          Add New Item
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <TextField
          label="Search Items"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 2 }}
        />
      </Paper>
      
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Current Inventory</Typography>
        <Box
          sx={{
            height: 300, // Set a fixed height for the inventory list
            overflowY: 'auto', // Enable vertical scrolling
          }}
        >
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <List>
              {filteredInventory.map((item) => (
                <ListItem key={item.id} sx={{ backgroundColor: 'primary.light', marginBottom: 1 }}>
                  <ListItemText primary={`${item.name} (x${item.quantity})`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" color="primary" onClick={() => handleOpenEditModal(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={() => removeItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>
      
      <AddItemModal open={addModalOpen} handleClose={handleCloseAddModal} />
      <EditItemModal open={editModalOpen} handleClose={handleCloseEditModal} currentItem={currentItem} />
    </Box>
  );
};

export default InventoryList;
