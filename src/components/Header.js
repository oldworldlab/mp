// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#292929' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Game Marketplace
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button color="inherit" component={Link} to="/">
            Marketplace
          </Button>
          <Button color="inherit" component={Link} to="/inventory">
            Inventory
          </Button>
          <Button color="inherit" component={Link} to="/crafting">
            Crafting
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            User Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
