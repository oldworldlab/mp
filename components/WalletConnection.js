import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ setProvider }) => {
  const [account, setAccount] = useState(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (isConnecting) return; // Prevent multiple requests
    setIsConnecting(true);

    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
        setProvider(provider); // Set the provider for the entire app
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }

    setIsConnecting(false);
  };

  useEffect(() => {
    connectWallet();
  }, [setProvider, connectWallet]);

  return (
    <div>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
