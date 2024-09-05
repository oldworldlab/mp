import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { ethers } from 'ethers';

function MetaMaskLogin({ onAccountChange }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        onAccountChange(accounts[0]);
      });
    }
  }, [onAccountChange]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        onAccountChange(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask not detected. Please install it to use this app.");
    }
  };

  return (
    <div>
      {!account ? (
        <Button variant="contained" color="primary" onClick={connectWallet}>
          Connect Wallet
        </Button>
      ) : (
        <Typography variant="h6">Connected Account: {account}</Typography>
      )}
    </div>
  );
}

export default MetaMaskLogin;
