import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

function ItemList({ items, category, onSelectItem }) {
  const filteredItems = items.filter(item => category === 'All' || item.category === category);

  return (
    <Box sx={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Marketplace
      </Typography>
      <Grid container spacing={2}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                onClick={() => onSelectItem(item)}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'blue',
                  },
                }}
              >
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Tier: {item.tier || '1'} {/* Default to Tier 1 if not specified */}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {item.price} ETH
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No items found in the marketplace.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default ItemList;
