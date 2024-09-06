import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { ethers } from 'ethers';

const WalletConnection = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        fetchBalance(provider, accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  };

  const fetchBalance = async (provider, account) => {
    try {
      const balanceInWei = await provider.getBalance(account);
      const balanceInEth = ethers.formatEther(balanceInWei);
      setBalance(balanceInEth);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        fetchBalance(new BrowserProvider(window.ethereum), accounts[0]);
      });
    }
    // Update balance after minting
    window.ethereum.on('chainChanged', () => {
      fetchBalance(new ethers.BrowserProvider(window.ethereum), account);
    });
  }, [account]);

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <p>Balance: {balance ? `${balance} ETH` : 'Fetching balance...'}</p>
        </div>
      )}
    </div>
  );
}

export default WalletConnection;
