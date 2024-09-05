@echo off
:: Define the project name
set PROJECT_NAME=blockchain-marketplace

:: Step 1: Create a new React app
npx create-react-app %PROJECT_NAME%

:: Step 2: Navigate into the project directory
cd %PROJECT_NAME%

:: Step 3: Install necessary packages
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material ethers web3 react-router-dom

:: Step 4: Create the project structure
mkdir src\components src\contracts src\styles

:: Step 5: Create components

:: MetaMaskLogin.js
(
echo import React, { useState, useEffect } from 'react';
echo import { Button, Typography } from '@mui/material';
echo import { ethers } from 'ethers';
echo.
echo function MetaMaskLogin({ onAccountChange }) {
echo ^    const [account, setAccount] = useState(null);
echo.
echo ^    useEffect(() => {
echo ^        if (window.ethereum) {
echo ^            window.ethereum.on('accountsChanged', (accounts) => {
echo ^                setAccount(accounts[0]);
echo ^                onAccountChange(accounts[0]);
echo ^            });
echo ^        }
echo ^    }, [onAccountChange]);
echo.
echo ^    const connectWallet = async () => {
echo ^        if (window.ethereum) {
echo ^            try {
echo ^                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
echo ^                setAccount(accounts[0]);
echo ^                onAccountChange(accounts[0]);
echo ^            } catch (error) {
echo ^                console.error("Failed to connect wallet:", error);
echo ^            }
echo ^        } else {
echo ^            alert("MetaMask not detected. Please install it to use this app.");
echo ^        }
echo ^    };
echo.
echo ^    return (
echo ^        <div>
echo ^            {!account ? (
echo ^                <Button variant="contained" color="primary" onClick={connectWallet}>
echo ^                    Connect Wallet
echo ^                </Button>
echo ^            ) : (
echo ^                <Typography variant="h6">Connected Account: {account}</Typography>
echo ^            )}
echo ^        </div>
echo ^    );
echo }
echo.
echo export default MetaMaskLogin;
) > src\components\MetaMaskLogin.js

:: Header.js
(
echo import React from 'react';
echo import { AppBar, Toolbar, Typography, Box } from '@mui/material';
echo.
echo function Header() {
echo ^    return (
echo ^        <AppBar position="static" sx={{ backgroundColor: '#333', mb: 3 }}>
echo ^            <Toolbar sx={{ justifyContent: 'space-between' }}>
echo ^                <Box sx={{ display: 'flex', alignItems: 'center' }}>
echo ^                    <Typography variant="h6">Secret Shop Marketplace</Typography>
echo ^                </Box>
echo ^            </Toolbar>
echo ^        </AppBar>
echo ^    );
echo }
echo.
echo export default Header;
) > src\components\Header.js

:: CategoriesList.js
(
echo import React from 'react';
echo import { Box, TextField, MenuItem } from '@mui/material';
echo.
echo const categories = [
echo ^  'All',
echo ^  'Consumables',
echo ^  'Crafting Resources',
echo ^  'Armor',
echo ^  'Weapons',
echo ^  'Skins'
echo ];
echo.
echo function CategoriesList({ onCategoryChange }) {
echo ^    return (
echo ^        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
echo ^            <TextField
echo ^                select
echo ^                label="Category"
echo ^                defaultValue="All"
echo ^                onChange={(e) => onCategoryChange(e.target.value)}
echo ^                sx={{ minWidth: 200 }}
echo ^            >
echo ^                {categories.map((category) => (
echo ^                    <MenuItem key={category} value={category}>
echo ^                        {category}
echo ^                    </MenuItem>
echo ^                ))}
echo ^            </TextField>
echo ^        </Box>
echo ^    );
echo }
echo.
echo export default CategoriesList;
) > src\components\CategoriesList.js

:: ItemList.js
(
echo import React from 'react';
echo import { Box, Typography, Grid } from '@mui/material';
echo.
echo function ItemList({ items, category, onSelectItem }) {
echo ^    const filteredItems = items.filter(item => category === 'All' || item.category === category);
echo.
echo ^    return (
echo ^        <Box sx={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9' }}>
echo ^            <Typography variant="h5" sx={{ mb: 2 }}>
echo ^                Marketplace
echo ^            </Typography>
echo ^            <Grid container spacing={2}>
echo ^                {filteredItems.length > 0 ? (
echo ^                    filteredItems.map((item, index) => (
echo ^                        <Grid item xs={12} sm={6} md={4} key={index}>
echo ^                            <Box
echo ^                                onClick={() => onSelectItem(item)}
echo ^                                sx={{
echo ^                                    border: '1px solid #ccc',
echo ^                                    borderRadius: '8px',
echo ^                                    padding: '10px',
echo ^                                    textAlign: 'center',
echo ^                                    backgroundColor: '#ffffff',
echo ^                                    cursor: 'pointer',
echo ^                                    '&:hover': {
echo ^                                        borderColor: 'blue',
echo ^                                    },
echo ^                                }}
echo ^                            >
echo ^                                <Typography variant="subtitle1">{item.name}</Typography>
echo ^                                <Typography variant="body2" color="textSecondary">
echo ^                                    Tier: {item.tier || '1'} ^{/* Default to Tier 1 if not specified */}
echo ^                                </Typography>
echo ^                                <Typography variant="body2" color="textSecondary">
echo ^                                    Quantity: {item.quantity}
echo ^                                </Typography>
echo ^                                <Typography variant="body2" color="textSecondary">
echo ^                                    Price: {item.price} ETH
echo ^                                </Typography>
echo ^                            </Box>
echo ^                        </Grid>
echo ^                    ))
echo ^                ) : (
echo ^                    <Typography variant="body1" sx={{ mt: 2 }}>
echo ^                        No items found in the marketplace.
echo ^                    </Typography>
echo ^                )}
echo ^            </Grid>
echo ^        </Box>
echo ^    );
echo }
echo.
echo export default ItemList;
) > src\components\ItemList.js

:: Inventory.js
(
echo import React, { useState } from 'react';
echo import { Box, TextField, MenuItem, Grid, Typography, Button } from '@mui/material';
echo.
echo function Inventory({ items, onListItem }) {
echo ^    const [searchTerm, setSearchTerm] = useState('');
echo ^    const [filterCategory, setFilterCategory] = useState('All');
echo ^    const [selectedItem, setSelectedItem] = useState(null);
echo ^    const [quantity, setQuantity] = useState(1);
echo ^    const [price, setPrice] = useState(0.01);
echo.
echo ^    const categories = ['All', 'Materials', 'Crafted Items'];
echo.
echo ^    const filteredItems = items
echo ^        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
echo ^        .filter(item => filterCategory === 'All' || item.category === filterCategory);
echo.
echo ^    const handleSelectItem = (item) => {
echo ^        setSelectedItem(item);
echo ^        setQuantity(1); ^{/* Reset quantity when selecting a new item */}
echo ^        setPrice(0.01); ^{/* Reset price when selecting a new item */}
echo ^    };
echo.
echo ^    const handleSellItem = () => {
echo ^        if (selectedItem && quantity > 0 && price > 0) {
echo ^            onListItem({ ...selectedItem, quantity, price });
echo ^            setSelectedItem(null); ^{/* Clear selection after listing the item */}
echo ^        }
echo ^    };
echo.
echo ^    return (
echo ^        <Box sx={{ mt: 4 }}>
echo ^            <Typography variant="h5" sx={{ mb: 2 }}>
echo ^                Inventory
echo ^            </Typography>
echo ^            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
echo ^                <TextField
echo ^                    label="Search"
echo ^                    variant="outlined"
echo ^                    value={searchTerm}
echo ^                    onChange={(e) => setSearchTerm(e.target.value)}
echo ^                    sx={{ mr: 2 }}
echo ^                />
echo ^                <TextField
echo ^                    select
echo ^                    label="Filter by Category"
echo ^                    value={filterCategory}
echo ^                    onChange={(e) => setFilterCategory(e.target.value)}
echo ^                    sx={{ minWidth: 200 }}
echo ^                >
echo ^                    {categories.map((category) => (
echo ^                        <MenuItem key={category} value={category}>
echo ^                            {category}
echo ^                        </MenuItem>
echo ^                    ))}
echo ^                </TextField>
echo ^            </Box>
echo ^            <Grid container spacing={2}>
echo ^                {filteredItems.length > 0 ? (
echo ^                    filteredItems.map((item, index) => (
echo ^                        <Grid item xs={6} sm={4} md={3} key={index}>
echo ^                            <Box
echo ^                                onClick={() => handleSelectItem(item)}
echo ^                                sx={{
echo ^                                    border: selectedItem?.name === item.name ? '2px solid blue' : '1px solid #ccc',
echo ^                                    borderRadius: '8px',
echo ^                                    padding: '10px',
echo ^                                    textAlign: 'center',
echo ^                                    backgroundColor: '#f9f9f9',
echo ^                                    cursor: 'pointer',
echo ^                                }}
echo ^                            >
echo ^                                <Typography variant="subtitle1">{item.name}</Typography>
echo ^                                <Typography variant="body2" color="textSecondary">
echo ^                                    {item.description}
echo ^                                </Typography>
echo ^                                <Typography variant="body2" color="textSecondary">
echo ^                                    Quantity: {item.quantity}
echo ^                                </Typography>
echo ^                            </Box>
echo ^                        </Grid>
echo ^                    ))
echo ^                ) : (
echo ^                    <Typography variant="body1" sx={{ mt: 2 }}>
echo ^                        No items in inventory.
echo ^                    </Typography>
echo ^                )}
echo ^            </Grid>
echo ^            {selectedItem && (
echo ^                <Box sx={{ mt: 2 }}>
echo ^                    <TextField
echo ^                        label="Quantity"
echo ^                        type="number"
echo ^                        value={quantity}
echo ^                        onChange={(e) => setQuantity(Math.min(e.target.value, selectedItem.quantity))}
echo ^                        inputProps={{ min: 1, max: selectedItem.quantity }}
echo ^                        sx={{ mr: 2 }}
echo ^                    />
echo ^                    <TextField
echo ^                        label="Price (ETH)"
echo ^                        type="number"
echo ^                        value={price}
echo ^                        onChange={(e) => setPrice(e.target.value)}
echo ^                        inputProps={{ min: 0.01, step: 0.01 }}
echo ^                        sx={{ mr: 2 }}
echo ^                    />
echo ^                    <Button variant="contained" color="primary" onClick={handleSellItem}>
echo ^                        List Item
echo ^                    </Button>
echo ^                </Box>
echo ^            )}
echo ^        </Box>
echo ^    );
echo }
echo.
echo export default Inventory;
) > src\components\Inventory.js

:: Step 6: Notify the user that the setup is complete
echo Setup complete! You can now start your React app using "npm start".

