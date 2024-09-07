import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button, Box, Typography, TextField, MenuItem } from '@mui/material';

// Deployed Greeter contract address
const CONTRACT_ADDRESS = "0x7c58674D1c4694B7CAf94a9B7666D806F6862D6C";
// ABI of the Greeter contract
const CONTRACT_ABI = [
  "function mintItem(uint256 itemId, uint256 amount, address to) external",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
];

// Item IDs matching the contract
const items = {
  ORE: 1,
  TIMBER: 2,
  COTTON: 3,
  LEATHER: 4,
  STONE: 5,
};

function Gather() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [selectedItem, setSelectedItem] = useState(items.ORE);
  const [amount, setAmount] = useState(1);
  const [balances, setBalances] = useState({
    ORE: 0,
    TIMBER: 0,
    COTTON: 0,
    LEATHER: 0,
    STONE: 0,
  });

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const _provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider instead of Web3Provider
      await _provider.send("eth_requestAccounts", []); // This replaces the older request accounts method
      const signer = await _provider.getSigner();
      const _account = await signer.getAddress();
      setProvider(_provider);
      setAccount(_account);
      
      // Connect to the contract
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(_contract);

      // Load initial balances
      await loadBalances(_contract, _account);
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  // Load balances of the resources for the connected account
  const loadBalances = async (_contract, _account) => {
    const _balances = {};
    for (const [key, value] of Object.entries(items)) {
      const balance = await _contract.balanceOf(_account, value);
      _balances[key] = parseInt(balance.toString());
    }
    setBalances(_balances);
  };

  // Handle minting of the selected resource
  const gatherResources = async () => {
    if (contract) {
      try {
        const tx = await contract.mintItem(selectedItem, amount, account);
        await tx.wait(); // Wait for the transaction to be mined
        alert("Minted successfully!");

        // Reload balances after minting
        await loadBalances(contract, account);
      } catch (error) {
        console.error("Error minting item:", error);
      }
    }
  };

  // UI for gathering resources
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4">Gather Resources</Typography>

      {!account ? (
        <Button variant="contained" onClick={connectWallet}>
          Connect Wallet
        </Button>
      ) : (
        <Box>
          <Typography variant="h6">Connected as: {account}</Typography>

          <TextField
            select
            label="Select Resource"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            sx={{ mb: 2, width: '200px' }}
          >
            {Object.keys(items).map((key) => (
              <MenuItem key={key} value={items[key]}>
                {key}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2, width: '200px' }}
            inputProps={{ min: 1 }}
          />

          <Button variant="contained" color="primary" onClick={gatherResources}>
            Gather
          </Button>

          <Typography variant="h6" sx={{ mt: 4 }}>Your Resource Balances:</Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {Object.keys(balances).map((key) => (
              <li key={key}>
                {key}: {balances[key]}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}

export default Gather;
