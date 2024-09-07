<Box className="container" sx={{ backgroundColor: '#1a1a1a', padding: 3 }}>
  <Typography variant="h4" className="glow-effect">Secret Shop</Typography>
  <TextField
    select
    label="Filter by Category"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    variant="outlined"
    sx={{
      mb: 2,
      width: '300px',
      backgroundColor: '#ffffff',  // White background for the select input
      color: '#000000',            // Black text color
      borderRadius: '5px',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#000',    // Black border
        },
        '&:hover fieldset': {
          borderColor: '#000',    // Black border on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: '#000',    // Black border when focused
        },
      },
      '& .MuiInputBase-input': { color: '#000' },  // Input text should be black
    }}
    InputLabelProps={{
      style: { color: '#000' },   // Label text should be black
    }}
    SelectProps={{
      MenuProps: {
        PaperProps: {
          style: {
            backgroundColor: '#ffffff',  // White background for dropdown
            color: '#000000',            // Black text color for dropdown items
          },
        },
      },
    }}
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="Secret Shop">Secret Shop</MenuItem>
    <MenuItem value="Weapons">Weapons</MenuItem>
    {/* Add other categories as necessary */}
  </TextField>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
    {items.map(item => (
      <Card key={item.name} sx={{ width: 300, backgroundColor: '#333333', color: '#e0e0e0' }}>
        <Typography variant="h6" sx={{ color: '#00d1ff', textShadow: '0 0 5px #00d1ff' }}>{item.name}</Typography>
        <Typography>{item.description}</Typography>
        <Typography>Price: {item.price} ETH</Typography>
      </Card>
    ))}
  </Box>
</Box>
