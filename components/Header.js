// components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Blockchain Crafting Game
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Marketplace
        </Button>
        <Button color="inherit" component={Link} to="/inventory">
          Inventory
        </Button>
        <Button color="inherit" component={Link} to="/crafting">
          Crafting
        </Button>
        <Button color="inherit" component={Link} to="/gather">
          Gather
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
