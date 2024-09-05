import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

const categories = [
  'All',
  'Consumables',
  'Crafting Resources',
  'Armor',
  'Weapons',
  'Skins'
];

function CategoriesList({ onCategoryChange }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <TextField
        select
        label="Category"
        defaultValue="All"
        onChange={(e) => onCategoryChange(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default CategoriesList;
