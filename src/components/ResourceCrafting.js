<TextField
  select
  label="Select Tier"
  value={selectedTier}
  onChange={(e) => setSelectedTier(e.target.value)}
  sx={{
    mb: 2,
    width: '200px',
    backgroundColor: '#ffffff',  // White background
    color: '#000000',            // Black text color
    '& .MuiMenuItem-root': {
      backgroundColor: '#ffffff',  // White background for dropdown
      color: '#000000',            // Black text color
    },
    '& .MuiSelect-icon': {
      color: '#000000',  // Black color for dropdown arrow
    }
  }}
>
  {Object.keys(craftingCosts).map((key) => (
    <MenuItem key={key} value={key}>
      Tier {key}
    </MenuItem>
  ))}
</TextField>
