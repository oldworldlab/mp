<TextField
  select
  label="Select Option"
  value={selectedOption}
  onChange={(e) => setSelectedOption(e.target.value)}
  sx={{
    mb: 2,
    width: '200px',
    backgroundColor: '#ffffff',  // White background
    color: '#000000',            // Black text color
    '& .MuiMenuItem-root': {
      backgroundColor: '#ffffff',  // White background for dropdown
      color: '#000000',            // Black text color
    },
  }}
>
  {options.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ))}
</TextField>
