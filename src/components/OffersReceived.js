import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

function OffersReceived({ offers }) {
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
        Offers Received
      </Typography>
      <Grid container spacing={2}>
        {offers.length > 0 ? (
          offers.map((offer, index) => (
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
                <Typography variant="subtitle1">{offer.itemName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Offered Price: {offer.price} ETH
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {offer.quantity}
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No offers received.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default OffersReceived;
