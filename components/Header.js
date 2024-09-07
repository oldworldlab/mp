// components/Header.js

import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a4a4a' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Blockchain Crafting Game
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
          Marketplace
        </Button>
        <Button color="inherit" component={Link} to="/inventory" sx={{ mx: 1 }}>
          Inventory
        </Button>
        <Button color="inherit" component={Link} to="/crafting" sx={{ mx: 1 }}>
          Crafting
        </Button>
        <Button color="inherit" component={Link} to="/resource-crafting" sx={{ mx: 1 }}>
          Resource Crafting
        </Button>
        <Button color="inherit" component={Link} to="/gather" sx={{ mx: 1 }}>
          Gather
        </Button>
        <Button color="inherit" component={Link} to="/profile" sx={{ mx: 1 }}>
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
