import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

function PopularItems({ items }) {
  const sortedItems = [...items].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 5); // Top 5 items

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
        Popular Items
      </Typography>
      <Grid container spacing={2}>
        {sortedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Sold: {item.quantitySold} units
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {item.price} ETH
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tier: {item.tier || '1'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PopularItems;
