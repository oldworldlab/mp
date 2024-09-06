import React, { useState } from 'react';
import { Box, TextField, MenuItem, Grid, Typography, Button } from '@mui/material';

function Inventory({ items, onListItem }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.01);

  const categories = ['All', 'Materials', 'Crafted Items'];

  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => filterCategory === 'All' || item.category === filterCategory);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1); // Reset quantity when selecting a new item
    setPrice(0.01); // Reset price when selecting a new item
  };

  const handleSellItem = () => {
    if (selectedItem && quantity > 0 && price > 0) {
      onListItem({ ...selectedItem, quantity, price });
      setSelectedItem(null); // Clear selection after listing the item
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Inventory
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          select
          label="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={2}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                onClick={() => handleSelectItem(item)}
                sx={{
                  border: selectedItem?.name === item.name ? '2px solid blue' : '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer',
                }}
              >
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {item.quantity}
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No items in inventory.
          </Typography>
        )}
      </Grid>
      {selectedItem && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(e.target.value, selectedItem.quantity))}
            inputProps={{ min: 1, max: selectedItem.quantity }}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Price (ETH)"
            type="number"
            value={price}
            onChange={(e) => setPrice(Math.max(e.target.value, 0.01))}
            inputProps={{ min: 0.01, step: 0.01 }}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSellItem}
            sx={{ mt: 2 }}
          >
            Sell {selectedItem.name}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Inventory;
