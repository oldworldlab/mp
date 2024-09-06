import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

function ActiveListings({ items }) {
  const activeListings = items.filter(item => item.owner === 'user'); // Assuming 'user' is the current account

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        mt: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Active Listings
      </Typography>
      <Grid container spacing={2}>
        {activeListings.length > 0 ? (
          activeListings.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
                }}
              >
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Tier: {item.tier || '1'}
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
            No active listings.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default ActiveListings;
