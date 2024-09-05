import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function ItemDetails({ item, onBuyItem }) {
  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant="h5" gutterBottom>{item.name}</Typography>
      <Typography variant="body1">{item.description}</Typography>
      <Typography variant="body2">Category: {item.category}</Typography>
      {item.stats && Object.keys(item.stats).length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Stats:</Typography>
          {Object.entries(item.stats).map(([key, value]) => (
            <Typography variant="body2" key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</Typography>
          ))}
        </Box>
      )}
      <Typography variant="body1" sx={{ mt: 2 }}>Price: {item.price} ETH</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onBuyItem(item)}
        sx={{ mt: 2 }}
      >
        Buy Item
      </Button>
    </Box>
  );
}

export default ItemDetails;
