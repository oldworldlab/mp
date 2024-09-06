import React, { useState } from 'react'; // Correct import for useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, Route from react-router-dom
import { Container } from '@mui/material'; // Import Container from Material-UI

// Import all your custom components
import WalletConnection from './components/WalletConnection';
import Marketplace from './components/Marketplace';
import Inventory from './components/Inventory';
import CraftingMenu from './components/CraftingMenu';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import Gather from './components/Gather'; // Make sure Gather component is imported
import Crafting from './components/Crafting'; // Import the Crafting component

function App() {
  const [account] = useState(null);
  const [category, setCategory] = useState('All');
  const [currency, setCurrency] = useState(100);
  const [items, setItems] = useState([
    { name: 'Iron Ingot', category: 'Materials', quantity: 50, price: 0.01, tier: 1, description: 'A refined iron ingot.', owner: 'user', quantitySold: 200 },
    { name: 'Leather Strip', category: 'Materials', quantity: 30, price: 0.02, tier: 1, description: 'A strip of tough leather.', owner: 'user', quantitySold: 150 },
    { name: 'Cloth', category: 'Materials', quantity: 40, price: 0.01, tier: 1, description: 'A piece of cloth.', owner: 'user', quantitySold: 120 },
    { name: 'Wood', category: 'Materials', quantity: 50, price: 0.01, tier: 1, description: 'A sturdy piece of wood.', owner: 'user', quantitySold: 180 },
  ]);
  const [inventory, setInventory] = useState([
    { name: 'Iron Ingot', category: 'Materials', quantity: 20, description: 'A refined iron ingot.', stats: {}, tier: 1 },
    { name: 'Leather Strip', category: 'Materials', quantity: 10, description: 'A strip of tough leather.', stats: {}, tier: 1 },
    { name: 'Cloth', category: 'Materials', quantity: 30, description: 'A piece of cloth.', stats: {}, tier: 1 },
    { name: 'Wood', category: 'Materials', quantity: 25, description: 'A sturdy piece of wood.', stats: {}, tier: 1 },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [offersMade, setOffersMade] = useState([]);
  const [offersReceived, setOffersReceived] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handleCategoryChange = (newCategory) => setCategory(newCategory);

  const handleListItem = (item) => {
    const existingMarketItem = items.find(marketItem => marketItem.name === item.name && marketItem.price === item.price && marketItem.tier === item.tier);

    if (existingMarketItem) {
      existingMarketItem.quantity += item.quantity;
      setItems([...items]);
    } else {
      setItems([...items, { ...item, owner: account }]);
    }

    const updatedInventory = inventory.map(invItem =>
      invItem.name === item.name ? { ...invItem, quantity: invItem.quantity - item.quantity } : invItem
    ).filter(invItem => invItem.quantity > 0);

    setInventory(updatedInventory);
  };

  const handleSelectItem = (item) => setSelectedItem(item);

  const handleBuyItem = (item, purchaseQuantity) => {
    const itemPrice = parseFloat(item.price);
    const quantity = parseInt(purchaseQuantity, 10);

    if (isNaN(itemPrice) || isNaN(quantity) || quantity <= 0) {
      alert('Invalid item price or quantity.');
      return;
    }

    const totalCost = itemPrice * quantity;

    if (currency >= totalCost) {
      const marketItem = items.find(i => i.name === item.name);

      if (marketItem && marketItem.quantity >= quantity) {
        marketItem.quantity -= quantity;
        if (marketItem.quantity === 0) {
          setItems(items.filter(i => i.name !== item.name));
        } else {
          setItems([...items]);
        }

        const inventoryItem = inventory.find(i => i.name === item.name);
        if (inventoryItem) {
          inventoryItem.quantity += quantity;
          setInventory([...inventory]);
        } else {
          setInventory([...inventory, { ...item, quantity }]);
        }

        setCurrency(currency - totalCost);

        setTransactions([...transactions, {
          type: 'Purchase',
          itemName: item.name,
          quantity,
          price: totalCost,
          date: new Date().toLocaleString(),
        }]);

        alert(`Purchased ${quantity} units of ${item.name} for ${totalCost} ETH`);
      } else {
        alert(`Not enough ${item.name} in the marketplace. Only ${marketItem?.quantity || 0} units available.`);
      }
    } else {
      alert(`Not enough currency. You need ${totalCost.toFixed(2)} ETH, but you only have ${currency.toFixed(2)} ETH.`);
    }
  };

  const handleCraftItem = (craftedItem) => {
    console.log(`Crafted item: ${craftedItem.name}`);
  };

  const handlePurchaseMaterial = (material, quantity, totalCost) => {
    if (currency >= totalCost) {
      const marketItem = items.find(i => i.name === material);
      if (marketItem && marketItem.quantity >= quantity) {
        marketItem.quantity -= quantity;
        const updatedInventory = inventory.map(i => i.name === material ? { ...i, quantity: i.quantity + quantity } : i);
        setInventory(updatedInventory);
        setItems(items.filter(i => i.quantity > 0));
        setCurrency(currency - totalCost);

        setTransactions([...transactions, {
          type: 'Material Purchase',
          itemName: material,
          quantity,
          price: totalCost,
          date: new Date().toLocaleString(),
        }]);
      } else {
        console.log(`Not enough ${material} in the marketplace.`);
      }
    } else {
      alert('Not enough currency.');
    }
  };

  return (
    <Router>
      <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', minHeight: '100vh', padding: '20px' }}>
        <Header />
        <WalletConnection />
        <Marketplace items={items} onBuyItem={handleBuyItem} />
        <Container maxWidth="xl">
          <Routes>
            <Route 
              path="/" 
              element={
                <Marketplace 
                  items={items} 
                  category={category} 
                  onCategoryChange={handleCategoryChange} 
                  onSelectItem={handleSelectItem} 
                  onBuyItem={handleBuyItem} 
                />
              } 
            />
            <Route 
              path="/inventory" 
              element={
                <Inventory 
                  items={inventory} 
                  onListItem={handleListItem} 
                />
              } 
            />
            <Route 
              path="/crafting" 
              element={
                <CraftingMenu 
                  inventory={inventory} 
                  marketplaceItems={items} 
                  onCraftItem={handleCraftItem} 
                  onPurchaseMaterial={handlePurchaseMaterial} 
                />
              } 
            />
            <Route 
              path="/gather" 
              element={<Gather />} // New Gather route
            />
            <Route 
              path="/profile" 
              element={
                <UserProfile 
                  account={account} 
                  currency={currency} 
                  transactions={transactions}
                  offersMade={offersMade}
                  offersReceived={offersReceived}
                />
              } 
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
