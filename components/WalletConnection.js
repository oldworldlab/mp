import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ setProvider }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account);
      setProvider(provider); // Set the provider for the entire app
    } else {
      console.log("Please install MetaMask!");
    }
  };

  useEffect(() => {
    connectWallet();
  }, [setProvider]);

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
