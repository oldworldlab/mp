import React from 'react';
import { Box, Typography } from '@mui/material';

function TransactionHistory({ transactions }) {
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
        Transaction History
      </Typography>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <Box
            key={index}
            sx={{
              borderBottom: '1px solid #ccc',
              padding: '10px 0',
            }}
          >
            <Typography variant="subtitle2">{transaction.type}</Typography>
            <Typography variant="body2" color="textSecondary">
              Item: {transaction.itemName} | Quantity: {transaction.quantity} | Price: {transaction.price} ETH
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {transaction.date}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No transactions yet.
        </Typography>
      )}
    </Box>
  );
}

export default TransactionHistory;
