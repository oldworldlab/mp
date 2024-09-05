@echo off

REM Step 1: Create React App
npx create-react-app blockchain-marketplace

REM Step 2: Navigate into the project directory
cd blockchain-marketplace

REM Step 3: Install necessary packages
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom

REM Step 4: Create the project structure
mkdir -p src/components src/pages src/styles

REM Step 5: Create Components and Pages
echo import React from 'react'; > src/components/Header.js
echo import { AppBar, Toolbar, Typography, Button } from '@mui/material'; >> src/components/Header.js
echo import { Link } from 'react-router-dom'; >> src/components/Header.js
echo ^(function Header() ^{ >> src/components/Header.js
echo ^  return (^<AppBar position="static" sx=^{{ backgroundColor: '#333' }}> >> src/components/Header.js
echo ^    <Toolbar sx=^{{ justifyContent: 'space-between' }}> >> src/components/Header.js
echo ^      <Typography variant="h6" component=^"div">Secret Shop Marketplace</Typography> >> src/components/Header.js
echo ^      <div> >> src/components/Header.js
echo ^        <Button color="inherit" component=^{Link} to=^"/">Marketplace</Button> >> src/components/Header.js
echo ^        <Button color="inherit" component=^{Link} to=^"/inventory">Inventory</Button> >> src/components/Header.js
echo ^        <Button color="inherit" component=^{Link} to=^"/crafting">Crafting</Button> >> src/components/Header.js
echo ^        <Button color="inherit" component=^{Link} to=^"/profile">User Profile</Button> >> src/components/Header.js
echo ^      </div> >> src/components/Header.js
echo ^    </Toolbar> >> src/components/Header.js
echo ^  </AppBar> >> src/components/Header.js
echo ^); >> src/components/Header.js
echo ^}) >> src/components/Header.js
echo export default Header; >> src/components/Header.js

REM Create simple components for Marketplace, Inventory, Crafting, and User Profile
echo import React from 'react'; > src/pages/Marketplace.js
echo function Marketplace() ^{ >> src/pages/Marketplace.js
echo ^  return (^<div>Marketplace Page</div>^); >> src/pages/Marketplace.js
echo ^} >> src/pages/Marketplace.js
echo export default Marketplace; >> src/pages/Marketplace.js

echo import React from 'react'; > src/pages/Inventory.js
echo function Inventory() ^{ >> src/pages/Inventory.js
echo ^  return (^<div>Inventory Page</div>^); >> src/pages/Inventory.js
echo ^} >> src/pages/Inventory.js
echo export default Inventory; >> src/pages/Inventory.js

echo import React from 'react'; > src/pages/Crafting.js
echo function Crafting() ^{ >> src/pages/Crafting.js
echo ^  return (^<div>Crafting Page</div>^); >> src/pages/Crafting.js
echo ^} >> src/pages/Crafting.js
echo export default Crafting; >> src/pages/Crafting.js

echo import React from 'react'; > src/pages/UserProfile.js
echo function UserProfile() ^{ >> src/pages/UserProfile.js
echo ^  return (^<div>User Profile Page</div>^); >> src/pages/UserProfile.js
echo ^} >> src/pages/UserProfile.js
echo export default UserProfile; >> src/pages/UserProfile.js

REM Step 6: Create CSS file
echo body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; color: #333; margin: 0; padding: 0; } > src/styles/global.css

REM Step 7: Update index.js for React Router
del src/index.js
echo import React from 'react'; > src/index.js
echo import ReactDOM from 'react-dom/client'; >> src/index.js
echo import './styles/global.css'; >> src/index.js
echo import App from './App'; >> src/index.js
echo import { BrowserRouter as Router } from 'react-router-dom'; >> src/index.js
echo const root = ReactDOM.createRoot(document.getElementById('root')); >> src/index.js
echo root.render( >> src/index.js
echo ^  <React.StrictMode> >> src/index.js
echo ^    <Router> >> src/index.js
echo ^      <App /> >> src/index.js
echo ^    </Router> >> src/index.js
echo ^  </React.StrictMode> >> src/index.js
echo ); >> src/index.js

REM Step 8: Create the main App.js with routes and layout
del src/App.js
echo import React from 'react'; > src/App.js
echo import { Routes, Route } from 'react-router-dom'; >> src/App.js
echo import Header from './components/Header'; >> src/App.js
echo import Marketplace from './pages/Marketplace'; >> src/App.js
echo import Inventory from './pages/Inventory'; >> src/App.js
echo import Crafting from './pages/Crafting'; >> src/App.js
echo import UserProfile from './pages/UserProfile'; >> src/App.js
echo function App() ^{ >> src/App.js
echo ^  return (^<div> >> src/App.js
echo ^    <Header /> >> src/App.js
echo ^    <Routes> >> src/App.js
echo ^      <Route path="/" element=^<Marketplace /> /> >> src/App.js
echo ^      <Route path="/inventory" element=^<Inventory /> /> >> src/App.js
echo ^      <Route path="/crafting" element=^<Crafting /> /> >> src/App.js
echo ^      <Route path="/profile" element=^<UserProfile /> /> >> src/App.js
echo ^    </Routes> >> src/App.js
echo ^  </div>^); >> src/App.js
echo ^} >> src/App.js
echo export default App; >> src/App.js

REM Step 9: Start the React App
npm start
