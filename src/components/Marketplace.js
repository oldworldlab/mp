import React, { useState } from 'react';
import VolumeChart from './VolumeChart';
import { Grid, MenuItem, Select, FormControl, InputLabel, Typography, Button, Paper, Slider, Box } from '@mui/material';

const Marketplace = ({ items, category, onCategoryChange, onSelectItem, onBuyItem }) => {
    const [selectedCategory, setSelectedCategory] = useState(category || 'All');
    const [quantities, setQuantities] = useState({}); // Store quantity selections for each item

    const categories = [
        'All',
        'Armor',
        'Weapons',
        'Potions',
        'Relics',
        'Resources',
    ];

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        onCategoryChange(event.target.value);
    };

    const handleQuantityChange = (itemName, newValue) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemName]: newValue,
        }));
    };

    const handleBuyItem = (item) => {
        const quantityToBuy = quantities[item.name] || 1; // Default to 1 if no quantity is set
        if (quantityToBuy <= item.quantity) {
            onBuyItem({ ...item, quantity: quantityToBuy });
        } else {
            alert(`Not enough ${item.name} available. Only ${item.quantity} units are in stock.`);
        }
    };

    const filteredItems = selectedCategory === 'All'
        ? items
        : items.filter(item => item.category === selectedCategory);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <VolumeChart style={{ height: '150px' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                    <Typography variant="h6">{selectedCategory} Items</Typography>
                    {filteredItems.length > 0 ? (
                        <Grid container spacing={2}>
                            {filteredItems.map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Paper 
                                        elevation={3} 
                                        style={{ padding: '10px', borderRadius: '5px' }}
                                    >
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                        <Typography variant="body1" color="textPrimary">Price: {item.price} ETH</Typography>
                                        <Typography variant="body1" color="textPrimary">Available: {item.quantity}</Typography>

                                        {/* Quantity Slider */}
                                        <Box sx={{ marginTop: '10px', marginBottom: '10px' }}>
                                            <Typography variant="body2">Select Quantity: {quantities[item.name] || 1}</Typography>
                                            <Slider
                                                value={quantities[item.name] || 1}
                                                min={1}
                                                max={item.quantity} // Set the slider max to the available quantity
                                                onChange={(event, newValue) => handleQuantityChange(item.name, newValue)}
                                                valueLabelDisplay="auto"
                                            />
                                        </Box>

                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            fullWidth 
                                            onClick={() => handleBuyItem(item)} 
                                        >
                                            Buy {quantities[item.name] || 1} {quantities[item.name] > 1 ? 'Units' : 'Unit'}
                                        </Button>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography>No items available in this category.</Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Marketplace;
