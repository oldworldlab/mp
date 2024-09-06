import React, { useState } from 'react';
import { ethers } from 'ethers';

const Minting = ({ onMintSuccess }) => {
  const [minting, setMinting] = useState(false);
  const [message, setMessage] = useState('');
  const [tokenId, setTokenId] = useState('');

  const handleMintNFT = async () => {
    if (window.ethereum && tokenId) {
      setMinting(true);
      setMessage('Minting in progress...');
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        
        // Replace this with your NFT contract address and ABI
        const contractAddress = '0xYourNFTContractAddress';
        const abi = [
          'function mintNFT(address to, uint256 tokenId) public returns (bool)',
        ];

        if (contractAddress && abi && signer) {
          const contract = new ethers.Contract(contractAddress, abi, signer);

          // Call the mint function on the smart contract
          const tx = await contract.mintNFT(await signer.getAddress(), tokenId);
          console.log('Minting transaction hash:', tx.hash);

          // Wait for the transaction to be mined
          await tx.wait();

          setMessage('NFT minted successfully!');
          onMintSuccess(tokenId); // Callback to update the UI or inventory
        } else {
          console.error('Contract, ABI, or signer is not defined.');
          setMessage('Minting failed. Please check your contract details.');
        }

      } catch (error) {
        console.error('Error minting NFT:', error);
        setMessage('Minting failed. Please try again.');
      } finally {
        setMinting(false);
        setTokenId(''); // Reset token ID input
      }
    } else {
      alert('Please connect your wallet and enter a valid token ID.');
    }
  };

  return (
    <div>
      <h2>Mint NFT</h2>
      <input
        type="text"
        placeholder="Enter Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={handleMintNFT} disabled={minting}>
        {minting ? 'Minting...' : 'Mint NFT'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Minting;
