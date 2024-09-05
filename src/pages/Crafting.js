// src/pages/Crafting.js
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, MenuItem, TextField } from '@mui/material';

function Crafting({ inventory, onCraftItem }) {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedTier, setSelectedTier] = useState(1);

  const craftingRecipes = {
    'Iron Sword': { 'Iron Ingot': 5, 'Wood': 2 },
    'Leather Armor': { 'Leather Strip': 10, 'Cloth': 5 },
    // Add more recipes here
  };

  const handleCraft = () => {
    if (selectedItem && craftingRecipes[selectedItem]) {
      const recipe = craftingRecipes[selectedItem];
      let hasMaterials = true;

      for (let material in recipe) {
        const inventoryItem = inventory.find(item => item.name === material);
        if (!inventoryItem || inventoryItem.quantity < recipe[material]) {
          alert(`Not enough ${material} available.`);
          hasMaterials = false;
          break;
        }
      }

      if (hasMaterials) {
        onCraftItem({ name: `${selectedItem} (Tier ${selectedTier})`, quantity: 1, stats: recipe });
      }
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#000' }}>Crafting</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <CardContent>
              <TextField
                select
                label="Select Item to Craft"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                fullWidth
                sx={{ marginBottom: '20px' }}
              >
                {Object.keys(craftingRecipes).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Select Tier"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                fullWidth
                sx={{ marginBottom: '20px' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(tier => (
                  <MenuItem key={tier} value={tier}>
                    Tier {tier}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCraft}
              >
                Craft Item
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Crafting;
