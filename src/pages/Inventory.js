import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Inventory = ({ items, onListItem }) => {

  const handleListItem = (item) => {
    const quantityToSell = parseInt(prompt(`Enter the quantity of ${item.name} to list:`), 10);
    if (quantityToSell > 0 && quantityToSell <= item.quantity) {
      const price = parseFloat(prompt(`Enter the price per unit of ${item.name}:`));
      if (price > 0) {
        onListItem({ ...item, quantity: quantityToSell, price });
      } else {
        alert("Invalid price. Please try again.");
      }
    } else {
      alert("Invalid quantity. Please try again.");
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Your Inventory</Typography>
      {items.length > 0 ? (
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  {item.price && (
                    <Typography variant="body2">Price: {item.price} ETH</Typography>
                  )}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ marginTop: '10px' }}
                    onClick={() => handleListItem(item)}
                  >
                    List Item
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No items in inventory.</Typography>
      )}
    </div>
  );
};

export default Inventory;
