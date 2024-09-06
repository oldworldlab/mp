import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Grid } from '@mui/material';

function UserProfile({ account, currency, transactions, offersMade, offersReceived }) {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', backgroundColor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom>Account</Typography>
            <Typography variant="body1">Address: {account}</Typography>
            <Typography variant="body1">Balance: {currency} ETH</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', backgroundColor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom>Transaction History</Typography>
            <List>
              {transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${tx.type} - ${tx.itemName} (Quantity: ${tx.quantity})`}
                      secondary={`Date: ${tx.date} | Price: ${tx.price} ETH`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No transactions found.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', backgroundColor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom>Offers Made</Typography>
            <List>
              {offersMade.length > 0 ? (
                offersMade.map((offer, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Offer: ${offer.itemName} | Price: ${offer.price} ETH`}
                      secondary={`Quantity: ${offer.quantity} | Date: ${offer.date}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No offers made.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', backgroundColor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom>Offers Received</Typography>
            <List>
              {offersReceived.length > 0 ? (
                offersReceived.map((offer, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Offer from: ${offer.from} | Item: ${offer.itemName} | Price: ${offer.price} ETH`}
                      secondary={`Quantity: ${offer.quantity} | Date: ${offer.date}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No offers received.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
