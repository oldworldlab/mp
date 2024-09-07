import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography, LinearProgress } from '@mui/material';

const craftingRecipes = {
  // Armor
  'Plate Helm': { 'Iron Ingot': 2, 'Leather Strip': 1 },
  'Plate Chest': { 'Iron Ingot': 5, 'Leather Strip': 2 },
  'Plate Gloves': { 'Iron Ingot': 1, 'Leather Strip': 1 },
  'Plate Boots': { 'Iron Ingot': 2, 'Leather Strip': 1 },
  'Plate Legs': { 'Iron Ingot': 3, 'Leather Strip': 2 },

  'Leather Helm': { 'Leather Strip': 2 },
  'Leather Chest': { 'Leather Strip': 5 },
  'Leather Gloves': { 'Leather Strip': 1 },
  'Leather Boots': { 'Leather Strip': 2 },
  'Leather Legs': { 'Leather Strip': 3 },

  'Cloth Helm': { Cloth: 2 },
  'Cloth Chest': { Cloth: 5 },
  'Cloth Gloves': { Cloth: 1 },
  'Cloth Boots': { Cloth: 2 },
  'Cloth Legs': { Cloth: 3 },

  'Chain Helm': { 'Iron Ingot': 2, 'Leather Strip': 1 },
  'Chain Chest': { 'Iron Ingot': 4, 'Leather Strip': 2 },
  'Chain Gloves': { 'Iron Ingot': 1, 'Leather Strip': 1 },
  'Chain Boots': { 'Iron Ingot': 2, 'Leather Strip': 1 },
  'Chain Legs': { 'Iron Ingot': 3, 'Leather Strip': 2 },

  // Weapons
  'Frost Staff': { Wood: 5, Cloth: 3, Artifact: 1 },
  'Fire Staff': { Wood: 5, Cloth: 3, Artifact: 1 },
  'Holy Staff': { Wood: 5, Cloth: 3, Artifact: 1 },
  Bow: { Wood: 4, Leather: 2 },
  Hammer: { 'Iron Ingot': 6, Wood: 2 },
  'Dual Axes': { 'Iron Ingot': 6, Wood: 2 },
  Sword: { 'Iron Ingot': 4, 'Leather Strip': 1 },

  // Potions
  'Health Potion': { 'Herbs': 3, 'Water': 1 },
  'Mana Potion': { 'Mana Herb': 3, 'Water': 1 },
  'Explosion Potion': { 'Explosive Powder': 2, 'Oil': 1 },

  // Artifacts
  'Magic Relic': { 'Crystal Shard': 3, 'Mystic Cloth': 2 },
  'Ancient Rune': { 'Stone Tablet': 2, 'Gold Ingot': 1 },
};

function CraftingMenu({ inventory, marketplaceItems, onCraftItem, onPurchaseMaterial }) {
  const [selectedItem, setSelectedItem] = useState('');
  const [tier, setTier] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isCrafting, setIsCrafting] = useState(false);
  const [craftedItem, setCraftedItem] = useState(null);

  const craftingTimes = {
    1: 2000, // Tier 1: 2 seconds
    2: 4000, // Tier 2: 4 seconds
    3: 6000, // Tier 3: 6 seconds
    4: 8000, // Tier 4: 8 seconds
    5: 10000, // Tier 5: 10 seconds
    6: 12000, // Tier 6: 12 seconds
    7: 14000, // Tier 7: 14 seconds
    8: 16000, // Tier 8: 16 seconds
  };

  const handleCraft = () => {
    if (!selectedItem) {
      alert('Please select an item to craft.');
      return;
    }

    const recipe = craftingRecipes[selectedItem];
    if (!recipe) {
      alert('Invalid recipe.');
      return;
    }

    const materialsNeeded = Object.entries(recipe);
    let canCraft = true;

    materialsNeeded.forEach(([material, amountNeeded]) => {
      const inventoryItem = inventory.find(item => item.name === material);
      const inventoryAmount = inventoryItem ? inventoryItem.quantity : 0;

      if (inventoryAmount < amountNeeded) {
        const neededFromMarket = amountNeeded - inventoryAmount;
        const marketItem = marketplaceItems.find(item => item.name === material);

        if (marketItem && marketItem.quantity >= neededFromMarket) {
          onPurchaseMaterial(material, neededFromMarket, marketItem.price * neededFromMarket);
        } else {
          canCraft = false;
          alert(`Not enough ${material} available.`);
        }
      }
    });

    if (canCraft) {
      setIsCrafting(true);
      setProgress(0);
      const craftingTime = craftingTimes[tier];
      const progressInterval = craftingTime / 100;

      const craftingInterval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(craftingInterval);
            setIsCrafting(false);
            const craftedItem = {
              name: `${selectedItem} (Tier ${tier})`,
              category: 'Crafted Items',
              description: `A crafted ${selectedItem} at Tier ${tier}.`,
              stats: {
                ...recipe,
                tier,
              },
              quantity: 1,
            };
            onCraftItem(craftedItem);
            setCraftedItem(craftedItem);
            return 100;
          }
          return prevProgress + 1;
        });
      }, progressInterval);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Box sx={{ mt: 4, padding: '20px', backgroundColor: '#222', borderRadius: '10px' }}>
      <Typography variant="h4" sx={{ color: '#e0e0e0', marginBottom: '20px' }}>Craft Items</Typography>
      <TextField
        select
        label="Select Item to Craft"
        value={selectedItem}
        onChange={(e) => handleSelectItem(e.target.value)}
        fullWidth
        sx={{
          mb: 2,
          backgroundColor: '#ffffff',  // White background
          color: '#000000',             // Black text
          borderRadius: '5px',
          '& .MuiInputBase-input': { color: '#000' }, // Ensure text is black
        }}
        disabled={isCrafting}
      >
        {Object.keys(craftingRecipes).map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Select Tier"
        value={tier}
        onChange={(e) => setTier(e.target.value)}
        fullWidth
        sx={{
          mb: 3, // Add more margin between item selection and tier selection
          backgroundColor: '#ffffff',  // White background
          color: '#000000',             // Black text
          borderRadius: '5px',
          '& .MuiInputBase-input': { color: '#000' }, // Ensure text is black
        }}
        disabled={isCrafting}
      >
        {[...Array(8).keys()].map((tier) => (
          <MenuItem key={tier + 1} value={tier + 1}>
            Tier {tier + 1}
          </MenuItem>
        ))}
      </TextField>

      {isCrafting && <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />}

      <Button
        variant="contained"
        color="primary"
        onClick={handleCraft}
        disabled={isCrafting}
        sx={{ mt: 2 }}
      >
        {isCrafting ? 'Crafting...' : 'Craft Item'}
      </Button>

      {craftedItem && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Crafted {craftedItem.name}!</Typography>
        </Box>
      )}
    </Box>
  );
}

export default CraftingMenu;
