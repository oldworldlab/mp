// components/Header.js

import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333333', boxShadow: '0 0 10px #00d1ff' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#00d1ff', textShadow: '0 0 5px #00d1ff, 0 0 20px #00d1ff' }}>
          Secret Shop
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ mx: 1, color: '#e0e0e0', '&:hover': { color: '#00ff85' } }}>
          Marketplace
        </Button>
        <Button color="inherit" component={Link} to="/inventory" sx={{ mx: 1, color: '#e0e0e0', '&:hover': { color: '#00ff85' } }}>
          Inventory
        </Button>
        <Button color="inherit" component={Link} to="/crafting" sx={{ mx: 1, color: '#e0e0e0', '&:hover': { color: '#00ff85' } }}>
          Crafting
        </Button>
        <Button color="inherit" component={Link} to="/resource-crafting" sx={{ mx: 1, color: '#e0e0e0', '&:hover': { color: '#00ff85' } }}>
          Resource Crafting
        </Button>
        <Button color="inherit" component={Link} to="/gather" sx={{ mx: 1, color: '#e0e0e0', '&:hover': { color: '#00ff85' } }}>
          Gather
        </Button>
        <Button color="inherit" component={Link} to="/profile" sx={{ mx: 1, color: '#e0e0e0', '&:hover': { color: '#00ff85' } }}>
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
